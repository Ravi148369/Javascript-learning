// function distinctArray(numbers) {
//   let distinctValues = new Array();
//   numbers.forEach((element) => {
//     if (!distinctValues.includes(element)) {
//       distinctValues.push(element);
//     }
//   });
//   return distinctValues;
// }

console.log(distinctArray([21, 21, 15, 15, 15, 21]));

function distinctArray(numbers) {
  let distinctValues = [];
  for (let i = 0; i < numbers.length; i++) {
    distinctValues.push(numbers[i]);
    if (i == 0) {
      continue;
    }
    for (let j = 0; j < distinctValues.length - 1; j++) {
      if (numbers[i] == distinctValues[j]) {
        distinctValues.pop();
      }
    }
  }
  return distinctValues;
}
