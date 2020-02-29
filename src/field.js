let card;
let backFaceCard;
let frontFaceCard;
let faceCardTemplate = ['./images/christmas/', '.svg'];
let backFace = faceCardTemplate.join('snowflake');
let btnStart = document.querySelector('button');
let select = document.querySelector('.size');
let wrapper = document.querySelector('.wrapper');


function drawField(fieldSize) {

    select.style.display = 'none';
    btnStart.style.display = 'none';

    let j = 0;

    for (let i = 0; i < fieldSize; i++) {
        card = document.createElement('div');
        card.className = 'card';
        wrapper.append(card);

        backFaceCard = document.createElement('img');
        backFaceCard.src = backFace;
        backFaceCard.className = 'back-face';
        card.append(backFaceCard);

        frontFaceCard = document.createElement('img');
        frontFaceCard.className = 'front-face';
        if (i % 2 == 0) {
            frontFaceCard.src = faceCardTemplate.join(j);
            card.setAttribute('data-image', `${j}`);
        } else {
            frontFaceCard.src = faceCardTemplate.join(j);
            card.setAttribute('data-image', `${j}`);
            j++;
        }
        card.append(frontFaceCard);
    }
}

function end() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(item => item.remove());
    wrapper.style.gridTemplateColumns = ``;
    select.style.display = 'inline-block';
    btnStart.style.display = 'inline-block';
}

export { drawField, end }