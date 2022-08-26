function calculatelectricityBill(unit) {
  if (unit <= 50) {
    return unit * 3.5;
  }
  if (unit <= 150) {
    return 50 * 3.5 + (unit - 50) * 4;
  }
  if (unit <= 250) {
    return 50 * 3.5 + 100 * 4 + (unit - 150) * 5.2;
  }
  if (unit > 250) {
    return 50 * 3.5 + 100 * 4 + 100 * 5.2 + (unit - 250) * 6.5;
  }
  return "not a Number";
}

console.log(calculatelectricityBill(75));
