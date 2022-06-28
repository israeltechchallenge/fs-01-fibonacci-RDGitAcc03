const myUrl =  "http://localhost:5050/getFibonacciResults";
let fibonacciUrl = "http://localhost:5050/fibonacci/";

let myArr = [];
let myIndex = document.getElementById("index");
let myY = document.getElementById('y');
let myMsg = document.getElementById('myMsg');

async function serverRequestData(url){
    const response = await fetch(url);
    const data = await response.json();
    myArr = data.results;
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
        myY.innerText = data.result;      
    }
}

let myBtn = document.getElementById('myBtn');

myBtn.addEventListener('click', (e)=> {
    e.preventDefault();
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
    else if (index === 42) {
        spinner.classList.add("spinner-border");
        serverWriteData(fibonacciUrl+index);
    }
    else {
        spinner.classList.add("spinner-border");

        myMsg.classList.remove('errorMsg');
        myMsg.classList.remove('fortyTwoMsgStyle');
        myMsg.innerText = "";


        serverWriteData(fibonacciUrl+index);
        serverRequestData(myUrl);
    }
}

