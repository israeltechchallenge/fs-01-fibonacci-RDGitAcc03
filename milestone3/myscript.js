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











// 0 1 1 2 3 5

// if (x > 2){
//     return FibonacciOfIndex(x-1) + FibonacciOfIndex(x-2); 
// }
// else {
//     return 1;
// }

          //F(4) --> F(3) + F(2)
                    //2    + //1
                //F(2)+F(1)    //F(1)+F(0)
               //1 + 0         //1 + //
//F(1)+F(0) //F(0)+F(-1)       //F(0)+F(-1) //F(-1)+F(-2)
//1 +   0       0 + //             0 + //      // + //