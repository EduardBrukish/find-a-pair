'use strict'

import './scss/main.scss'

import { drawField, end } from './field.js'

import { Snowfall } from './snowfall.js'

let snowfall = new Snowfall();

snowfall.letItSnow();

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let wrapper = document.querySelector('.wrapper');
let btnStart = document.querySelector('button');
let audioFlipFirst = new Audio('../sound/flip.mp3');
let audioFlipSecond = new Audio('../sound/flip.mp3');
let audioCoincidence = new Audio('../sound/coincedence.mp3');
let mapping = {
    6: 3,
    12: 4,
    18: 6,
    24: 6,
};
let numberOfUnflippedCards = [];
let select = document.querySelector('.size');

btnStart.addEventListener('click', getStart);

function getStart() {
    let fieldSize = select.value;

    wrapper.style.gridTemplateColumns = `repeat(${mapping[fieldSize]}, 1fr)`;

    drawField(fieldSize);

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));

    shuffle(cards, fieldSize);

    numberOfUnflippedCards[0] = fieldSize;

}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    audioFlipFirst.play();

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    audioFlipSecond.play();

    audioFlipSecond.onended = function () {
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        audioCoincidence.play();

        disableCards();
        getUnflippedCards();
        return;
    }

    unflipCards();
}


function getUnflippedCards() {
    numberOfUnflippedCards[0] -= 2;
    console.log(numberOfUnflippedCards[0]);
    if (numberOfUnflippedCards[0] === 0) end();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle(cards, fieldSize) {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * fieldSize);
        card.style.order = randomPos;
    });
};