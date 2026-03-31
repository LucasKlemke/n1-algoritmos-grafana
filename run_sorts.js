const fs = require('fs');
const path = require('path');
const http = require('http');

const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { trace } = require('@opentelemetry/api');
const client = require('prom-client');

const { bubbleSort } = require('./sorts/bubble_sort/bubble_sort');
const { insertSort } = require('./sorts/insert_sort/insert_sort');
const { mergeSort } = require('./sorts/merge_sort/merge_sort');

// OpenTelemetry setup
const OTEL_ENDPOINT = 'http://localhost:4318';
const provider = new NodeTracerProvider();
provider.addSpanProcessor(
  new BatchSpanProcessor(
    new OTLPTraceExporter({ url: `${OTEL_ENDPOINT}/v1/traces` })
  )
);
provider.register();
const tracer = trace.getTracer('sort-algorithm');

// Prometheus metrics
const register = new client.Registry();

const executionTime = new client.Histogram({
  name: 'sort_execution_time_seconds',
  help: 'Tempo de execução em segundos',
  labelNames: ['algorithm', 'input_size'],
  registers: [register],
});

const comparacoesCounter = new client.Counter({
  name: 'sort_comparacoes_total',
  help: 'Total de comparações realizadas',
  labelNames: ['algorithm', 'input_size'],
  registers: [register],
});

const trocasCounter = new client.Counter({
  name: 'sort_trocas_total',
  help: 'Total de trocas realizadas',
  labelNames: ['algorithm', 'input_size'],
  registers: [register],
});

// HTTP server for Prometheus scraping
const server = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  } else {
    res.writeHead(404);
    res.end();
  }
});
server.listen(8000, () => console.log('Servidor de métricas iniciado em http://localhost:8000/metrics'));

function loadArray(filepath) {
  const content = fs.readFileSync(filepath, 'utf8').trim();
  return content.split(',').map(Number);
}

function loadAllArrays(folder) {
  return fs
    .readdirSync(folder)
    .filter((f) => /^array_\d+\.csv$/.test(f))
    .sort((a, b) => {
      const sizeA = parseInt(a.replace('array_', '').replace('.csv', ''));
      const sizeB = parseInt(b.replace('array_', '').replace('.csv', ''));
      return sizeA - sizeB;
    })
    .map((f) => {
      const size = parseInt(f.replace('array_', '').replace('.csv', ''));
      return [size, loadArray(path.join(folder, f))];
    });
}

async function runSort(name, fn, arr) {
  console.log(`Iniciando ${name} com ${arr.length} elementos`);
  const span = tracer.startSpan(name);
  span.setAttribute('algorithm', name);
  span.setAttribute('input.size', arr.length);

  try {
    const start = process.hrtime.bigint();
    const [result, comparacoes, trocas] = fn([...arr]);
    const elapsed = Number(process.hrtime.bigint() - start) / 1e9;

    span.setAttribute('execution_time_s', elapsed);
    span.setAttribute('comparacoes', comparacoes);
    span.setAttribute('trocas', trocas);

    executionTime.labels({ algorithm: name, input_size: String(arr.length) }).observe(elapsed);
    comparacoesCounter.labels({ algorithm: name, input_size: String(arr.length) }).inc(comparacoes);
    trocasCounter.labels({ algorithm: name, input_size: String(arr.length) }).inc(trocas);

    console.log(
      `Finalizado ${name} | ${arr.length} elementos | ${elapsed.toFixed(6)}s | comparações: ${comparacoes} | trocas: ${trocas}`
    );
    console.log(
      `  [${name}] ${arr.length} elementos → ${elapsed.toFixed(6)}s | comparações: ${comparacoes} | trocas: ${trocas}`
    );

    return result;
  } catch (e) {
    console.error(`Erro ao executar ${name}: ${e}`);
    span.setAttribute('error', String(e));
    throw e;
  } finally {
    span.end();
  }
}

async function main() {
  const arrays = loadAllArrays(path.join(__dirname, 'data_arrays'));

  for (const [size, arr] of arrays) {
    console.log(`\n── Array ${size} elementos ──`);
    await runSort('bubble_sort', bubbleSort, arr);
    await runSort('insert_sort', insertSort, arr);
    await runSort('merge_sort', mergeSort, arr);
  }

  console.log('\nMétricas disponíveis em http://localhost:8000/metrics');
}

main().catch(console.error);
