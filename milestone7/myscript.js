const myUrl =  "http://localhost:5050/getFibonacciResults";
let fibonacciUrl = "http://localhost:5050/fibonacci/";

let myArr = [];
let myIndex = document.getElementById("index");
let myY = document.getElementById('y');
let myMsg = document.getElementById('myMsg');
let myCheckBox = document.getElementById('saveCalc');
let isCalculationSaved; 

async function serverRequestData(url){
    const response = await fetch(url);
    const data = await response.json();
    myArr = data.results;
    console.log(myArr);
    showResults(myArr);     
}

let serverMsg = "";
async function serverWriteData(url){
    const response = await fetch(url);
    try {
        if (!response.ok) {
            text = await response.text();
            serverMsg = text;
            myMsg.classList.remove('errorMsg');
            myMsg.classList.add('fortyTwoMsgStyle');
            myMsg.innerText = serverMsg;
            myY.innerText = 'Y';
        }
    }
    catch(err) {    
        console.log("An Error Occured", err);
    }
    finally {
        spinner.classList.remove("spinner-border");
        const data = await response.json();
        console.log(data);
        myY.innerText = data.result;      
    }
}

let myBtn = document.getElementById('myBtn');

myBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    isCalculationSaved = document.getElementById('saveCalc').checked;
    setTimeout(()=> {
        spinner.classList.remove("spinner-border");
    }
    , 2000);
    appendNewResult(myIndex.value);
});

let spinner = document.getElementById("spinner");

serverRequestData(myUrl);


function showResults(arr) {
    for (let i= 0; i< arr.length; i++){
        let container = document.getElementById('containerDiv');
        let divItem = document.createElement('div');
        divItem.classList.add('mt-4-div');
        divItem.innerHTML = stringify(arr[i]);
        container.append(divItem);
    }
}

function stringify(someObj) {
    let str = `<span class="fs-5 border-bottom pb-2 mb-4 border-secondary">The Fibonacci of <b>${someObj.number}</b> is <b>${someObj.result}</b>. Calculated at: ${new Date(someObj.createdDate).toString()} (Israel Standard Time)</span>`;
    return str;
}


function appendNewResult(index){
    if (index > 50) {
        myMsg.classList.add('errorMsg');
        myMsg.classList.remove('fortyTwoMsgStyle');
        myY.innerText = 'Y';
        myMsg.innerText = "Can't be larger than 50!";
    }
    else {
        myMsg.innerText = "";
        spinner.classList.add("spinner-border");
        myMsg.classList.remove('errorMsg');
        myMsg.classList.remove('fortyTwoMsgStyle');

        if (isCalculationSaved) {        
            serverWriteData(fibonacciUrl+index);
            serverRequestData(myUrl);
        }
        else {        
            serverRequestData(myUrl);
            myY.innerText = FibonacciOfIndex(index);
        }
    }
    console.log(isCalculationSaved);
}

function FibonacciOfIndex(n) { 
    n = parseInt(myIndex.value); 
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

    return sum;
}