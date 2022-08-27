const pallindrom = (str) => {
  let isPallindrom = false;
  for (let i = 0, k = str.length - 1; i < str.length / 2; i++, k--) {
    if (str[i] == str[k]) {
      isPallindrom = true;
    } else {
      return false;
    }
  }
  return isPallindrom;
};
console.log(pallindrom("ravivar"));
