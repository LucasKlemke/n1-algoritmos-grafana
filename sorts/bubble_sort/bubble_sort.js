function bubbleSort(arr) {
  if (arr.length <= 1) return [arr, 0, 0];

  let comparacoes = 0;
  let trocas = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      comparacoes++;
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        trocas++;
      }
    }
  }

  return [arr, comparacoes, trocas];
}

module.exports = { bubbleSort };
