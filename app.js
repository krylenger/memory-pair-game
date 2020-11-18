const cards = [
    {
        key: 1,
        text: 'HTTP'
    },
    {
        key: 1,
        text: 'Hyper Text Transfer Protocol'
    },
    {
        key: 2,
        text: 'HTML'
    },
    {
        key: 2,
        text: 'Hyper Text Markup Language'
    },
    {
        key: 3,
        text: 'CSS'
    },
    {
        key: 3,
        text: 'Cascade Style Sheet'
    },
    {
        key: 4,
        text: 'JS'
    },
    {
        key: 4,
        text: 'JavaScript'
    }
]

const main = document.querySelector('.main');
let mainGridContainer = document.querySelector('.main__grid-container');


const createNewCard = (card) => {
    const newCard = document.createElement('div');
    const newCardFlipper = document.createElement('div');
    const newCardFlipperFront = document.createElement('div');
    const newCardFlipperBack = document.createElement('div');
    newCard.classList.add('card');
    newCardFlipper.classList.add('card__flipper');
    newCardFlipper.setAttribute('ontouchstart', "this.classList.toggle('card__flipper--flip');")
    newCardFlipperFront.classList.add('card__flipper-front', card.key);
    newCardFlipperBack.classList.add('card__flipper-back');
    newCardFlipperBack.textContent = card.text;
    newCard.appendChild(newCardFlipper);
    newCardFlipper.appendChild(newCardFlipperFront);
    newCardFlipper.appendChild(newCardFlipperBack);
    return newCard;
}

const shuffleArr = (arr) => {
    return arr.sort(() => 0.5 - Math.random());
}

const loadCards = (cardsArr) => {
    const shuffledCards = shuffleArr(cardsArr);
    const fragment = document.createDocumentFragment();
    shuffledCards.forEach(card => {
        const newCard = createNewCard(card);
        fragment.appendChild(newCard);
    })
    mainGridContainer.appendChild(fragment);
}

const resetGame = () => {
    mainGridContainer.remove();
    mainGridContainer = document.createElement('div');
    mainGridContainer.classList.add('main__grid-container');
    main.appendChild(mainGridContainer);
    
    loadCards(cards);
    handleClick();
}

const handlePlayingCards = (cardStatus) => {
    let playingNow = document.querySelectorAll(".playingNow");
    playingNow.forEach((card) => {
        card.classList.remove("playingNow");
        setTimeout(() => {
            card.parentNode.classList.toggle(cardStatus);
        }, 1000)
    });
}

const handleGameOver = (guessedCards) => {
    if (guessedCards === 8) {
        setTimeout(() => {
            alert('won!');
            resetGame();
            guessedCards = [];
        }, 1000)
    }
}

const flipTwoCards = () => {
    let clickCounter = 0;
    let guessedCards = 0;
    let playingCards = [];
    mainGridContainer.addEventListener('click', ({target}) => {
        console.log(target);
        if (
          target.classList.contains("card__flipper-front") &&
          !target.parentNode.classList.contains("guessed") &&
          playingCards.length < 2
        ) {
          target.parentNode.classList.toggle("card__flipper--flip");
          target.classList.add("playingNow");
          clickCounter += 1;
          playingCards.push(target.classList.value);
          console.log(playingCards);
          if (clickCounter === 2 && playingCards[0] === playingCards[1]) {
            handlePlayingCards('guessed');
            clickCounter = 0;
            playingCards = [];
            guessedCards += 2;
          } else if (clickCounter === 2 && playingCards[0] !== playingCards[1]) {
            handlePlayingCards('card__flipper--flip');
            setTimeout(() => {
                clickCounter = 0;
                playingCards = [];
            }, 1000)
          }
        }
        handleGameOver(guessedCards);
    })
}

const handleClick = () => {
    flipTwoCards();
}

const initApp = () => {
    loadCards(cards);
    handleClick();
}

document.addEventListener('DOMContentLoaded', initApp);
