
const resultsURL =  "http://localhost:5050/getFibonacciResults";
let fibonacciValueURL = "http://localhost:5050/fibonacci/";


const fibonacciIndex = document.getElementById("index");
const fibonacciValue = document.getElementById('y');
const errorMsg = document.getElementById('myMsg');
const containerListHolder = document.getElementById('containerDiv');
const checkBox = document.getElementById('saveCalc');
const anchorsListDropdown = document.getElementById('aListDropdown');
const myBtn = document.getElementById('myBtn');
const spinner = document.getElementById("spinner");
let isCalculationSaved; 
let serverMsg = "";






window.addEventListener('load', FetchAndShowResults);




anchorsListDropdown.addEventListener('click', (e)=> {
    containerListHolder.innerHTML = "";
    if (e.target.innerText  === "Number Asc") {   
        spinnerOn();    
        FetchAndShowResults("Number Asc");
    }
    else if (e.target.innerText  === "Number Desc") {
        spinnerOn();  
        FetchAndShowResults("Number Desc");
    }
    else if (e.target.innerText  === "Date Asc") {
        spinnerOn();  
        FetchAndShowResults("Date Asc");
    }
    else if(e.target.innerText  === "Date Desc") {
        spinnerOn();  
        FetchAndShowResults("Date Desc");
    }
});


function spinnerOn() {
    spinner.classList.add("spinner-border");
    setTimeout(()=>spinner.classList.remove("spinner-border"),2000);
}


async function FetchAndShowResults(sortingOption='Sort By'){
    const response = await fetch(resultsURL);
    const data = await response.json();
    let myArr = await data.results;
    sortingResultsByCriteria(myArr,sortingOption)
    createHtmlElements(myArr);
}


async function FetchFibonacciValueServerWithErrorMsg(url){
    const response = await fetch(url);
    try {
        if (!response.ok) {
            text = await response.text();
            serverMsg = text;
            errorMsg.classList.remove('errorMsg');
            errorMsg.classList.add('fortyTwoMsgStyle');
            errorMsg.innerText = serverMsg;
            fibonacciValue.innerText = 'Y';
            throw Error("");
        }
    }
    catch(err) {    
        console.log("An Error Occured", err);
    }
    finally {
        spinner.classList.remove("spinner-border");
        const data = await response.json();
        fibonacciValue.innerText = data.result;      
    }
}


myBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    isCalculationSaved = checkBox.checked;
    setTimeout(()=> {
        spinner.classList.remove("spinner-border");
    }
    , 2000);
    appendNewResult(fibonacciIndex.value);
});


function createHtmlElements(arr) {
    for (let i= arr.length - 1; i>= 0; i--){
        let divItem = document.createElement('div');
        divItem.classList.add('mt-4-div');
        divItem.innerHTML = stringify(arr[i]);
        containerListHolder.append(divItem);
    }   
}


function stringify(objectInsideArr) {
    const str = "<span class='fs-5 border-bottom pb-2 mb-4 border-secondary'>" +
              "The Fibonacci of <b>" + objectInsideArr.number + "</b>" + 
              " is <b> " + objectInsideArr.result + "</b>." +
              " Calculated at: " + new Date(objectInsideArr.createdDate).toString() + "(Israel Standard Time)</span>";
    return str;
}


function appendNewResult(){
    if (fibonacciIndex.value > 50) {
        errorMsg.classList.add('errorMsg');
        errorMsg.classList.remove('fortyTwoMsgStyle');
        fibonacciValue.innerText = 'Y';
        errorMsg.innerText = "Can't be larger than 50!";
    }
    else {
        if (isCalculationSaved) {
            if(fibonacciIndex.value === 42){
                errorMsg.classList.remove('errorMsg');
                errorMsg.classList.add('fortyTwoMsgStyle');
            }        
            else {
                errorMsg.innerText = "";
                spinner.classList.add("spinner-border");
                errorMsg.classList.remove('errorMsg');
                errorMsg.classList.remove('fortyTwoMsgStyle');
            }
            FetchFibonacciValueServerWithErrorMsg(fibonacciValueURL+fibonacciIndex.value);
            FetchAndShowResults();
        }
        else {        
            errorMsg.innerText = "";
            spinner.classList.add("spinner-border");
            errorMsg.classList.remove('errorMsg');
            errorMsg.classList.remove('fortyTwoMsgStyle');
            fibonacciValue.innerText = FibonacciOfIndex(fibonacciIndex.value);
        }
    }
}


function FibonacciOfIndex(n) { 
    n = parseInt(fibonacciIndex.value); 
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


function compareValuesByKeyAndOrder(a, b){
    return a-b;
}


function sortingResultsByCriteria(arr, option) {
    switch(option){
        case "Sort By":
            arr.sort((a,b)=>compareValuesByKeyAndOrder(a.number,a.number));
        break;
        case "Number Asc":
            arr.sort((a,b)=>compareValuesByKeyAndOrder(b.number,a.number));
        break;

        case "Number Desc":
            arr.sort((a,b)=>compareValuesByKeyAndOrder(a.number,b.number));
        break;

        case "Date Asc":
            arr.sort((a,b)=>compareValuesByKeyAndOrder(b.createdDate,a.createdDate));
        break;

        case "Date Desc":
            arr.sort((a,b)=>compareValuesByKeyAndOrder(a.createdDate,b.createdDate));
        break;
    }
}

