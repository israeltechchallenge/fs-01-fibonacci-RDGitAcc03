
let x = document.getElementById("index"); 
let myBtn = document.getElementById("myBtn");
let result = document.getElementById("result");

// 0 1 1 2 3 5
 

function FibonacciOfIndex(index) {
    if (index > 2){
        return FibonacciOfIndex(index - 1) + FibonacciOfIndex(index - 2);
    }
    else {
        return 1;
    }
}

function printFibonacci() {
    let answer = FibonacciOfIndex(parseInt(x.value));
    result.value = answer;
}

myBtn.addEventListener('click', printFibonacci);


//           F(4) --> F(3) + F(2)
//                     2    + //1
//                 F(2)+F(1)    //F(1)+F(0)
//                1 + 0         //1 + //
// F(1)+F(0) //F(0)+F(-1)       //F(0)+F(-1) //F(-1)+F(-2)
// 1 +   0       0 + //             0 + //      // + //