function counterWords(sentence) {
  sentence = sentence.trim();
  let count = 0;
  if (sentence.length == 0) {
    return count;
  }
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] == " " && sentence[i + 1] != " ") {
      count++;
    }
  }

  return count + 1;
}
console.log(counterWords(""));
