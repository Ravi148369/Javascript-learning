function showFactorial(n){
    if(typeof n!="number" || n<0){
        return "invalid input"
    }
    if(n===0){
        return 1
    }
    return n*showFactorial(n-1)
}
console.log(showFactorial(5)); 