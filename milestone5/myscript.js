
let myBtn = document.getElementById("myBtn");
let mySpinnerDiv = document.getElementById("mySpinnerDiv");
let myInput = document.getElementById("index");
let errorMsg = document.getElementsByClassName("errorMsg")[0];


let myUrl = "http://localhost:5050/fibonacci/";

let serverMsg = "";

function callServer(url) { 
    fetch(url)
        .then(response => {
            //5-c
            try {
                if (!response.ok) {
                    return response.text()
                    .then(text => { 
                        serverMsg = text;
                        errorMsg.innerText = serverMsg;
                    });
                } 
            }
            catch (err) {
                console.log("An Error Occured", err);
            }
            finally {
                return response.json();
            }
        })
        .then(data => {
            mySpinnerDiv.classList.remove("spinner-border");    
            mySpinnerDiv.classList.add("spinner-border-hidden");    
            myInput.value = data.result;
        }); 
}
myBtn.addEventListener('click', function() {
    let fullUrl =  myUrl+myInput.value;
    //5-b
    if(parseInt(myInput.value) > 50) {
        errorMsg.classList.remove("fortyTwoMsgStyle");
        errorMsg.classList.add("errorMsg");
        errorMsg.innerText = "Can't be larger than 50";
    }   
    else if (parseInt(myInput.value) === 42) {
        errorMsg.classList.add("fortyTwoMsgStyle");
        callServer(fullUrl);
    }
    else {
        errorMsg.classList.remove("fortyTwoMsgStyle");
        errorMsg.classList.remove("errorMsg");
        mySpinnerDiv.classList.add("spinner-border");   
        callServer(fullUrl);
        errorMsg.innerText = " ";
    }
})
