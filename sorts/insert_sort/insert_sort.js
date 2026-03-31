function insertSort(arr) {
  let comparacoes = 0;
  let trocas = 0;

  for (let i = 1; i < arr.length; i++) {
    const currentValue = arr[i];
    let j = i - 1;
    while (j >= 0) {
      comparacoes++;
      if (arr[j] > currentValue) {
        arr[j + 1] = arr[j];
        trocas++;
        j--;
      } else {
        break;
      }
    }
    arr[j + 1] = currentValue;
  }

  return [arr, comparacoes, trocas];
}

module.exports = { insertSort };
