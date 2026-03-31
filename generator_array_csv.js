const fs = require('fs');

function generateArrayCsv(size, minVal = 0, maxVal = 100000) {
  fs.mkdirSync('data_arrays', { recursive: true });

  const filename = `data_arrays/array_${size}.csv`;
  const array = Array.from(
    { length: size },
    () => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
  );

  fs.writeFileSync(filename, array.join(',') + '\n');
  console.log(`Arquivo gerado: ${filename} (${size} elementos)`);
}

const sizes = [1000, 5000, 10000, 50000];
for (const size of sizes) {
  generateArrayCsv(size);
}
