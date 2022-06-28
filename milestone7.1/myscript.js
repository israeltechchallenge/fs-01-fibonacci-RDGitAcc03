
const myUrl =  "http://localhost:5050/getFibonacciResults";
let fibonacciUrl = "http://localhost:5050/fibonacci/";

let myArr = [];
let myIndex = document.getElementById("index");
let myY = document.getElementById('y');
let myMsg = document.getElementById('myMsg');
let container = document.getElementById('containerDiv');
let myCheckBox = document.getElementById('saveCalc');
let isCalculationSaved; 
let aListDropdown = document.getElementById('aListDropdown');

window.addEventListener('load', init);

aListDropdown.addEventListener('click', (e)=> {
    container.innerHTML = "";
    if (e.target.innerText  === "Number Asc") {   
        spinnerOn();  
        updateMyArr("Number Asc");
    }
    else if (e.target.innerText  === "Number Desc") {
        spinnerOn();  
        updateMyArr("Number Desc");
    }
    else if (e.target.innerText  === "Date Asc") {
        spinnerOn();  
        updateMyArr("Date Asc");
    }
    else if(e.target.innerText  === "Date Desc") {
        spinnerOn();  
        updateMyArr("Date Desc");
    }
});


function spinnerOn() {
    spinner.classList.add("spinner-border");
    setTimeout(()=>spinner.classList.remove("spinner-border"),2000);
}

async function init(){
    const response = await fetch(myUrl);
    const data = await response.json();
    myArr = data.results;
    BuildResults();
}

async function updateMyArr(sortingOption){
    const response = await fetch(myUrl);
    const data = await response.json();
    myArr = sorting(sortingOption);
    BuildResults();

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


function BuildResults() {
    for (let i= myArr.length - 1; i>= 0; i--){
        let divItem = document.createElement('div');
        divItem.classList.add('mt-4-div');
        divItem.innerHTML = stringify(myArr[i]);
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
        if (isCalculationSaved) {
            if(index === 42){
                myMsg.classList.remove('errorMsg');
                myMsg.classList.add('fortyTwoMsgStyle');
            }        
            else {
                myMsg.innerText = "";
                spinner.classList.add("spinner-border");
                myMsg.classList.remove('errorMsg');
                myMsg.classList.remove('fortyTwoMsgStyle');
            }
            serverWriteData(fibonacciUrl+index);
            init();
        }
        else {        
            myMsg.innerText = "";
            spinner.classList.add("spinner-border");
            myMsg.classList.remove('errorMsg');
            myMsg.classList.remove('fortyTwoMsgStyle');
            myY.innerText = FibonacciOfIndex(index);
        }
    }
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

function compareValuesByKeyAndOrder(a, b, order='asc'){
        let comparison = 0;
        if (a > b) {
            comparison = -1;
        }
        else if (a < b) {
            comparison = 1;
        }
        if(order === 'desc') {
            comparison = comparison * -1; 
        }
        return comparison;
}


function sorting(option) {
    switch(option){
        case "Number Asc":
            myArr = myArr.sort((a,b)=>compareValuesByKeyAndOrder(a.number,b.number));
        break;

        case "Number Desc":
            myArr = myArr.sort((a,b)=>compareValuesByKeyAndOrder(a.number,b.number, 'desc'));
        break;

        case "Date Asc":
            myArr = myArr.sort((a,b)=>compareValuesByKeyAndOrder(a.createdDate,b.createdDate));
        break;

        case "Date Desc":
            myArr = myArr.sort((a,b)=>compareValuesByKeyAndOrder(a.createdDate,b.createdDate, 'desc'));
        break;
    }
    return myArr;
}

