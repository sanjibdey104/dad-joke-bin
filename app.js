
// ACCESSING THE CARD AND CONTROLS
const card = document.querySelector('.card');
const cardback = document.querySelector('.card-back');
const jokePara = document.querySelector('.joke-para');
const fetchJokeBtn = document.querySelector('.fetch-joke-btn');
const navbar = document.querySelector('.navbar');
const navList = document.querySelector('.nav-list');
const navbarToggleBtn = document.querySelector('.navbar-toggle-btn');
const copyJokeBtn = document.querySelector('.copy-joke-btn');
const container = document.querySelector('.container');
const toggleDisplayMode = document.querySelector('.toggle-display');


navbarToggleBtn.addEventListener('click', (e) => {
    navbar.classList.toggle('show');
})

window.addEventListener('click', (e) => {
    if(e.target.classList[0] === "container")
    navbar.classList.remove('show');
})


toggleDisplayMode.addEventListener('click', (e) => {
    container.classList.toggle('night-mode');
})


fetchJokeBtn.addEventListener('click', (e) => {
    copyJokeBtn.classList.remove('confirm');
    card.classList.add('is-flipped');
    cardback.removeChild(jokePara);

    // TRIGGERING XHR

    const xhr = new XMLHttpRequest();
    const url = "https://icanhazdadjoke.com/";

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function() {
        if (this.status >= 200 && this.status < 400){
            let jokeObj = JSON.parse(xhr.responseText);
            let {joke} = jokeObj;

            jokePara.innerText = "";
            jokePara.innerText = joke;
            cardback.appendChild(jokePara);

            copyJokeBtn.addEventListener('click', copyJoke);
        }
        else 
        console.log("response failed");
    }

    xhr.send();
})

function copyJoke() {
    const jokeText = jokePara.innerText;
    let tempInputElement = document.createElement("input");
    tempInputElement.type = "text";
    tempInputElement.value = jokeText;

    document.body.appendChild(tempInputElement);
    tempInputElement.select();
    document.execCommand("Copy");

    document.body.removeChild(tempInputElement);
    copyConfirmation();
}

function copyConfirmation() {
    copyJokeBtn.classList.add('confirm');
}