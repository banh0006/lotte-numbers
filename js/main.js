let defaultUrl = "https://davidst.edumedia.ca/mad9014/nums.php?"; /*"https://davidst.edumedia.ca/mad9014/nums.php?digits=6&max=42"*/

let httpRequest = "POST";

document.addEventListener("DOMContentLoaded", init);

function init() {
    let pages = document.querySelectorAll(".page");
    let sendButton = document.querySelector("#btnSend");
    let backButton = document.querySelector("#btnBack");

    sendButton.addEventListener("click", () => {
        if (checkInput()) {
            getData();
            pages[0].classList.toggle("active");
            pages[1].classList.toggle("active");
        }
    });

    backButton.addEventListener("click", () => {
        refreshNumber();
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");
    });
    
    
}

function getData() {
    let url = buildUrl();
    fetch(url).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let listNumber = data.numbers;
//        console.log(listNumber);
        displayResult(listNumber);
    })
    .catch((error) => alert(error));
}

function checkInput() {
    let digit = document.getElementById("digits");
    let max = document.getElementById("max");

    if (digit.value.length == 0) {
        alert("Please give the digit number");
        digit.focus();
        return 0;
    }
    if (digit.value < 1 || digit.value > 10) {
        alert("Digit must be from 1 to 10");
        digit.focus();
        return 0;
    }

    if (max.value.length == 0) {
        alert("Please give the range number");
        max.focus();
        return 0;
    }
    if (max.value < 1 || max.value > 99) {
        alert("Range from 1 to 99, please insert again");
        max.focus();
        return 0;
    }
    return 1;
}

function buildUrl() {
    let url = defaultUrl;
    let digit = document.getElementById("digits").value;
    url = url.concat("digits=", digit);
    
    let max = document.getElementById("max").value;
    url = url.concat("&max=", max);
    
    return url;
}

function displayResult(data) {
    let ul = document.querySelector("ul");
//    console.log("ul found");
//    console.log("list number" + data.length);
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.id = "number" + i;
        li.className = "lotteNumber";
        li.appendChild(document.createTextNode(data[i]));
        ul.appendChild(li);
    }
}

function refreshNumber() {
    let ul = document.querySelector("ul");
    let listLi = document.querySelectorAll("li");
//    console.log(listLi.length);
    for (let li of listLi) {
        ul.removeChild(li);
    }
}