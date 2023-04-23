// cards container
let main = document.querySelector('.main');

// buttons container 
let buttonsContainer = document.querySelector('.buttons');

//cards container
const principalContainer =document.querySelector('.principal-container');

// cards list
const cardsList = [
  { id: 1, name: "", image: new Image(), url: "./images/img1.png" },
  { id: 1, name: "", image: new Image(), url: "./images/img1.png" },
  { id: 2, name: "", image: new Image(), url: "./images/img2.png" },
  { id: 2, name: "", image: new Image(), url: "./images/img2.png" },
  { id: 3, name: "", image: new Image(), url: "./images/img3.png" },
  { id: 3, name: "", image: new Image(), url: "./images/img3.png" },
  { id: 4, name: "", image: new Image(), url: "./images/img4.png" },
  { id: 4, name: "", image: new Image(), url: "./images/img4.png" },
  { id: 5, name: "", image: new Image(), url: "./images/img5.png" },
  { id: 5, name: "", image: new Image(), url: "./images/img5.png" },
];

let loadedImages = 0;
cardsList.forEach((card) => {
  card.image.onload = () => {
    loadedImages++;
    if (loadedImages === cardsList.length) {
      // All images have finished loading
      console.log("All images loaded.");
      // Now you can display the images on the page
    }
  };
  card.image.src = card.url;
  console.log(card.image.src)
});

// mixing cards
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    };
  
    return array;
  };
  
  // Call the shuffle function to shuffle the cards
shuffle(cardsList);
// creating cards
function creatingCards(array) {
  for (product of array) {

    // <section class="card">
      // <div class="front"></div>
      // <div class="back"></div>
    // </section>

    //card
    let card = document.createElement("section");
    card.classList.add("card");
    main.appendChild(card);

    card.setAttribute('card_id', product.id);
    

    // front
    let front = document.createElement("div");
    front.classList.add("front");
    card.appendChild(front);
    //putting image

    front.style.backgroundImage = `url('/images/mystical-drawing-sun-with-face-moon-crescent-moon-device-universe-crescent-moon_166005-974.avif')`;

    //back
    let back = document.createElement("div");
    back.classList.add("back");
    card.appendChild(back);
    back.style.setProperty("background-image", `url(${product.url})`);

    //card rotation
    card.addEventListener("click", rotation);
    restartButton.addEventListener("click", restart);

    card.style.display = "block";

    
  };
};
// selecting all the back elements
const backElements = document.querySelectorAll(".back");

// adding the rotation function to each back element
backElements.forEach((backElement) => {
  backElement.addEventListener("click", rotation);
});

//text in middle of the screen
var result = document.createElement('p');
principalContainer.appendChild(result);
result.classList.add('result_text');

// score system
let score = document.createElement('p');
let scoreCount = 0;
score.classList.add('score');
buttonsContainer.appendChild(score);
score.innerHTML = `Your score: ${scoreCount}`;

// restart score
function restartScore(){
  scoreCount = 0;
  score.innerHTML = `Your score: ${scoreCount}`;
};
// rotation card function
function rotation() {
    if(!this.classList.contains('matched') && document.querySelectorAll('.actived').length < 2){
      this.classList.add('actived');

      let activeCards = document.querySelectorAll('.actived');
      if (activeCards.length >= 2){
        let firstCard = activeCards[0];
        let secondCard = activeCards[1];
        if (firstCard.getAttribute('card_id') === secondCard.getAttribute('card_id')) {
          matchedCards(firstCard, secondCard);
          scoreCount+= 3;
          score.innerHTML = `Your score: ${scoreCount}`;
        } else {
          secondCard.classList.add('actived');

          this.classList.add('actived');
          activeCards.forEach((card) => {
            setTimeout(() => {
              firstCard.classList.remove('actived');
              secondCard.classList.remove('actived');
            }, 1500);
          });
        };
      };

      // registering if the user finishes the game or he does'nt
      if(cardsList.length === document.querySelectorAll('.matched').length){

        clearInterval(timerInterval);

        setTimeout(() => {
          deleteCards();
        }, 1000);

        setTimeout(() => {
          result.innerHTML = ('You win!')
        }, 2000);

      };
    };
};
// all matched carts function that actives them
function matchedCards(firstCard, secondCard){

  // add matched class
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  //remove actived class
  firstCard.classList.remove('actived');
  secondCard.classList.remove('actived');
};
//deleting all cards
function deleteCards() {
  main.innerHTML = "";
};

function restart() {
  let cardsActive = document.querySelectorAll(".card");
  for (let card of cardsActive) {
    card.classList.remove("actived");
}
  // deleting result text 
  result.innerHTML = "";

  // stop timer 
  restartTimer();

  // deleting, mixing and creating the cards again
  deleteCards();
  shuffle(cardsList)
  creatingCards(cardsList);

  // restarting score 
  restartScore();
};
// button start or restart
const startButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");

startButton.addEventListener("click", changingButtons);

function changingButtons() {
  main.classList.add('cards-container')
  // creating cars
  creatingCards(cardsList);

  // starting timer 
  countdown();

  startButton.style.display = "none";
}






// timer

let timerInterval;

// Get the timer element from the HTML
let timer = document.querySelector('.timer');

// Update the timer every second
function countdown() {
  let minutes = 00;
  let seconds = 00;
  let hours = 00;
  timerInterval = setInterval(() => {
    // Update the seconds
    seconds++;

    // If the seconds reach 0, decrement the minutes and reset the seconds to 59
    if (seconds > 50) {
      seconds = 0;
      minutes++;
    };
    if(minutes > 59){
      hours++;
      seconds = 0;
      minutes = 0;
    };
      // Otherwise, update the timer element with the current minutes and seconds
      timer.textContent = `Your time: ${hours}:${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      // // timer.textContent = `${hours}:${minutes}:$
  }, 1000);
}

// reset timer
function restartTimer() {
  clearInterval(timerInterval);
  countdown();
}

