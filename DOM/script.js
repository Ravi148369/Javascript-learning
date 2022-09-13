function checkedElement(id) {
  return document.querySelectorAll(`#${id}  input[checked]`);
}

function attributeSelector() {
  return document.querySelectorAll(" a[ href $= ru]");
}

function lastElementUl() {
  return document.querySelectorAll("ul li:last-child");
}

function closestElement(selector,element){
    return document.querySelector(`${selector}`).closest(`${element}`)
}
// document.querySelector('form').
console.log(closestElement('.book','.contents'))
console.log(closestElement('.b','.a'))
let lastElement=lastElementUl() ;
console.log(attributeSelector());
console.log(checkedElement("table"));

