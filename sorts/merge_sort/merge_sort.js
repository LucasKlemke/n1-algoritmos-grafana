function mergeSort(arr, _comparacoes = null, _trocas = null) {
  if (_comparacoes === null) {
    _comparacoes = [0];
    _trocas = [0];
  }

  if (arr.length <= 1) return [arr, _comparacoes[0], _trocas[0]];

  const mid = Math.floor(arr.length / 2);
  const [listEsq] = mergeSort(arr.slice(0, mid), _comparacoes, _trocas);
  const [listDir] = mergeSort(arr.slice(mid), _comparacoes, _trocas);

  const newArr = [];
  let i = 0;
  let k = 0;

  while (i < listEsq.length && k < listDir.length) {
    _comparacoes[0]++;
    if (listEsq[i] > listDir[k]) {
      newArr.push(listDir[k++]);
    } else {
      newArr.push(listEsq[i++]);
    }
    _trocas[0]++;
  }

  return [
    [...newArr, ...listEsq.slice(i), ...listDir.slice(k)],
    _comparacoes[0],
    _trocas[0],
  ];
}

module.exports = { mergeSort };
