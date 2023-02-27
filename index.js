// const card = document.querySelector('.card');

//cards container
const cardsContainer = document.querySelector(".cards-container");
const principalContainer =document.querySelector('.principal-container')
// cards list
const cardslist = [
  { id: 1, name: "", image: "./images/img1.png" },
  { id: 1, name: "", image: "./images/img1.png" },
  { id: 2, name: "", image: "./images/img2.png" },
  { id: 2, name: "", image: "./images/img2.png" },
  { id: 3, name: "", image: "./images/img3.png" },
  { id: 3, name: "", image: "./images/img3.png" },
  { id: 4, name: "", image: "./images/img4.png" },
  { id: 4, name: "", image: "./images/img4.png" },
  { id: 5, name: "", image: "./images/img5.png" },
  { id: 5, name: "", image: "./images/img5.png" },
];

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
    }
  
    return array;
  }
  
  // Call the shuffle function to shuffle the cards
shuffle(cardslist);
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
    cardsContainer.appendChild(card);

    card.setAttribute('card_id', product.id);
    

    // front
    let front = document.createElement("div");
    front.classList.add("front");
    card.appendChild(front);
    //putting image

    front.style.backgroundImage = `url('./images/62ho7z2dmv9a1.webp')`;

    //back
    let back = document.createElement("div");
    back.classList.add("back");
    card.appendChild(back);
    back.style.setProperty("background-image", `url(${product.image})`);

    //card rotation
    card.addEventListener("click", rotation);
    restartButton.addEventListener("click", restart);

    card.style.display = "block";

    
  }
}
// selecting all the back elements
const backElements = document.querySelectorAll(".back");

// adding the rotation function to each back element
backElements.forEach((backElement) => {
  backElement.addEventListener("click", rotation);
});

//text in middle of the screen
var result = document.createElement('p');
principalContainer.appendChild(result);
result.classList.add('result_text')

// rotation card function
function rotation() {
    if(!this.classList.contains('matched') && document.querySelectorAll('.actived').length < 2){
      this.classList.add('actived');

      let activeCards = document.querySelectorAll('.actived');
      if (activeCards.length >= 2){
        let firstCard = activeCards[0];
        let secondCard = activeCards[1];
        if (firstCard.getAttribute('card_id') === secondCard.getAttribute('card_id')) {
          matchedCards(firstCard, secondCard)
        } else {
          secondCard.classList.add('actived');
          //secondCard.classList.remove('actived');

          this.classList.add('actived');
          activeCards.forEach((card) => {
            setTimeout(() => {
              firstCard.classList.remove('actived');
              secondCard.classList.remove('actived');
            }, 1500);
          });
        };
      };

      // registering if the user finishes the game or he doesnt
      if(cardslist.length === document.querySelectorAll('.matched').length){
        console.log('game finished');

        clearInterval(timerInterval);

        setTimeout(() => {
          deleteCards();
        }, 1000)

        setTimeout(() => {
          result.innerHTML = ('You win!')
        }, 2000)

      } else{
        console.log('the game continues');
      };
    }    ;  
};
// all matched carts function that actives them
function matchedCards(firstcard, secondCard){
  // add matched class
  firstcard.classList.add('matched')
  secondCard.classList.add('matched')
  //remove actived class
  firstcard.classList.remove('actived')
  secondCard.classList.remove('actived')
}
//deleting all cards
function deleteCards() {
  cardsContainer.innerHTML = "";
}

function restart() {
  let cardsActive = document.querySelectorAll(".card");
  for (let card of cardsActive) {
    card.classList.remove("actived");
}
  // deleting result text 
  result.remove()

  // stop timer 
  restartTimer()

  // deleting, mixing and creating the cards again
  deleteCards();
  shuffle(cardslist)
  creatingCards(cardslist);
}
// button start or restart
const startButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");

startButton.addEventListener("click", changingButtons);

function changingButtons() {
  // creating cars
  creatingCards(cardslist);

  // starting timer 
  countdown()

  startButton.style.display = "none";
}







// timer

let timerInterval;

// Get the timer element from the HTML
let timer = document.querySelector('.timer');

// Update the timer every second
function countdown() {
  let minutes = 1;
  let seconds = 60;
  timerInterval = setInterval(() => {
    // Update the seconds
    seconds--;

    // If the seconds reach 0, decrement the minutes and reset the seconds to 59
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    // If the minutes and seconds both reach 0, stop the timer and display a message
    if (minutes === 0 && seconds === 0) {
      clearInterval(timerInterval);
      timer.textContent = "Time's up!, you have losed";
    } else {
      // Otherwise, update the timer element with the current minutes and seconds
      timer.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  }, 1000);
}

// reset timer
function restartTimer() {
  clearInterval(timerInterval);
  countdown();
}