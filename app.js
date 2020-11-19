const orelSong = new Audio('orel.mp3');
const gopgopSong = new Audio('gopgop.mp3');
const tanciSong = new Audio('tanci.mp3');
const cadilacSong = new Audio('cadilac.mp3');
const dimSong = new Audio('dim.mp3');

const cards = [
    {
        key: 1,
        text: 'orel',
        musicCard: false
    },
    {
        key: 1,
        text: '$',
        musicCard: true,
        song: orelSong
    },
    {
        key: 2,
        text: 'gopgop',
        musicCard: false
    },
    {
        key: 2,
        text: '$',
        musicCard: true,
        song: gopgopSong
    },
    {
        key: 3,
        text: 'tanci',
        musicCard: false
    },
    {
        key: 3,
        text: '$',
        musicCard: true,
        song: tanciSong
    },
    {
        key: 4,
        text: 'cadilac',
        musicCard: false
    },
    {
        key: 4,
        text: '$',
        musicCard: true,
        song: cadilacSong
    },
    {
        key: 5,
        text: 'dim',
        musicCard: false
    },
    {
        key: 5,
        text: '$',
        musicCard: true,
        song: dimSong
    }
]

const main = document.querySelector('.main');
let mainGridContainer = document.querySelector('.main__grid-container');


const createNewCard = (card, cardNumber) => {
    const newCard = document.createElement('div');
    const newCardFlipper = document.createElement('div');
    const newCardFlipperFront = document.createElement('div');
    const newCardFlipperBack = document.createElement('div');
    if (card.musicCard) {
        newCard.classList.add('card', `card--${cardNumber}`, 'musicCard')
        newCardFlipperBack.classList.add(`card--music-img`);
    } else {
        newCard.classList.add('card', `card--${cardNumber}`);
        newCardFlipperBack.classList.add(`card--${card.text}-img`);
    }
    newCardFlipper.classList.add('card__flipper');
    newCardFlipper.setAttribute('ontouchstart', "this.classList.toggle('card__flipper--flip');")
    newCardFlipperFront.classList.add('card__flipper-front', card.key);
    newCardFlipperBack.classList.add('card__flipper-back');
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
    shuffledCards.forEach((card, index) => {
        const newCard = createNewCard(card, index);
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
    const playingNow = document.querySelectorAll(".playingNow");
    playingNow.forEach((card) => {
        card.classList.remove("playingNow");
        setTimeout(() => {
            card.parentNode.classList.toggle(cardStatus);
        }, 1000)
    });
}

const handleGameOver = (guessedCards) => {
    if (guessedCards === 10) {
        setTimeout(() => {
            alert('won!');
            resetGame();
            guessedCards = [];
        }, 1000)
    }
}

let playedSongs = [];

const handleMusicCard = (target) => {
    if (target.parentNode.parentNode.classList.contains('musicCard')) {
        const targetKeyNumber = target.classList.value.match(/\d/)[0];
        const targetObj = cards.find((card) => card.musicCard && card.key === Number.parseInt(targetKeyNumber, 10));
        // console.log(targetObj);
        if (playedSongs.length) {
            let previousSong = playedSongs[playedSongs.length - 1];
            previousSong.pause();
            previousSong.currentTime = 0;
        }
        playedSongs.push(targetObj.song);

        console.log(playedSongs);
        targetObj.song.play();
        
    };
}

const flipTwoCards = () => {
    let clickCounter = 0;
    let guessedCards = 0;
    let playingCards = [];
    mainGridContainer.addEventListener('click', ({target}) => {
        if (
          target.classList.contains("card__flipper-front") &&
          !target.parentNode.classList.contains("guessed") &&
          playingCards.length < 2
        ) {
          target.parentNode.classList.toggle("card__flipper--flip");
          target.classList.add("playingNow");
          handleMusicCard(target);

          clickCounter += 1;
          playingCards.push(target.classList.value);
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

