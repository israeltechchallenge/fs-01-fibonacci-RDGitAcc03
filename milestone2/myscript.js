let x = document.getElementById("index"); 
let myBtn = document.getElementById("myBtn");
let result = document.getElementById("result");

function FibonacciOfIndex(n) { 
    n = parseInt(x.value); 
    let a = 0;
    let b = 1;
    let sum = 0;
    if (n === 1) {
        sum = 1;
    }
    for(let i = 1; i < n; i++){
        sum = a + b;
        a = b;
        b = sum;
    }

    result.value = sum;
}


myBtn.addEventListener('click', FibonacciOfIndex);











