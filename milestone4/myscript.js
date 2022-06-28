
let x = document.getElementById("index"); 
let myBtn = document.getElementById("myBtn");
let result = document.getElementById("result");

let myUrl = "http://localhost:5050/fibonacci/";


function callServer(url) { 
    fetch(url)
        .then(response => response.json())  
        .then(data => {
            result.value = data.result;
        }); 
}


myBtn.addEventListener('click',  function(){
    let n = parseInt(x.value);
    callServer(myUrl+n);
});
