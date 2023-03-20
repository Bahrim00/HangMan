'use strict';

const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
const resetButton = document.querySelector('.reset-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');
const livesImg = document.querySelector('.lives-img');
const allButtons = document.querySelectorAll('.alpha');
const container = document.querySelector('#container')
const nextButton = document.querySelector('.next-btn');
const hintTxt = document.querySelector('.hintText')
const final = document.querySelector('.final')
const notificare = document.querySelector('.notificare')

let letters;
let lives;
let select_word;
let correctWords = 0;
let incorrectWords = 0;


const words = new Map([
    ['gerunziu', 'Prima litera este "G", iar ultima este "U"'],
    ['verb', 'Prima litera este "V"'],
    ['perfect compus', 'Prima litera este "P", iar ultima este "S"'],
    ['pasivă', 'Prima litera este "P", iar ultima este "Ă"'],
    ['conjunctiv', 'Prima litera este "C", iar ultima este "V"'],
    ['impersonal', 'Prima litera este "I", iar ultima este "L"'],
    ['mai-mult-ca-perfect', 'Prima litera este "M", iar ultima este "T"'],
    ['copulativ', 'Prima litera este "C", iar ultima este "V"'],
    ['viitor anterior', 'Prima litera este "V", iar ultima este "R"'],
    ['reflexivă', 'Prima litera este "R", iar ultima este "Ă"'],
    ['end', 'Indiciul'],
]);

const word_list = [...words.keys()];

const getRandomWord = function (list) {
    return list[Math.floor(Math.random() * word_list.length)];

};




function nextWord() {
    notif.classList.add('hidden');
    container.classList.remove("blur");
    letters.forEach(btn => btn.classList.remove('disabled'));

    const wordIterator = words.keys();
    let currentWord = wordIterator.next().value;
    while (currentWord !== select_word) {
        currentWord = wordIterator.next().value;
    }

    currentWord = wordIterator.next().value || words.keys().next().value;
    select_word = currentWord;
    function updateHintText(selectedWord) {
        if (selectedWord === 'gerunziu') {
            hintTxt.innerHTML = 'Verbul <i class="ghilimele">mâncând</i> este la modul: ';
        } else if (selectedWord === 'verb') {
            hintTxt.innerHTML = 'Partea de vorbire care exprimă acțiuni, stări, existența, se numește:';
        } else if (selectedWord === 'perfect compus') {
            hintTxt.innerHTML = 'Verbul <i class="ghilimele">am scris</i> este la timpul:';
        } else if (selectedWord === 'pasivă') {
            hintTxt.innerHTML = 'Verbul din enunțul <i class="ghilimele">Vei fi plecat luna viitoare</i>, este la diateza: ';
        } else if (selectedWord === 'conjunctiv') {
            hintTxt.innerHTML = 'Verbul <i class="ghilimele">să fi plecat</i>, este la modul:';
        } else if (selectedWord === 'impersonal') {
            hintTxt.innerHTML = 'Verbul <i class="ghilimele">a tuna</i> este un verb:';
        } else if (selectedWord === 'mai-mult-ca-perfect') {
            hintTxt.innerHTML = 'Verbul din enunțul <i class="ghilimele">Mâncaserăm foarte multă ciocolată</i> este la timpul: ';
        } else if (selectedWord === 'copulativ') {
            hintTxt.innerHTML = 'Verbul <i class="ghilimele">a deveni</i> din enunțul: <i>Ea devine medic.</i> este:';
        } else if (selectedWord === 'viitor anterior') {
            hintTxt.innerHTML = 'Verbul <i class="ghilimele">voi fi citit</i> este la timpul:';
        } else if (selectedWord === 'reflexivă') {
            hintTxt.innerHTML = 'Verbul din enunțul: <i class="ghilimele">Mă gândesc și acum la cartea pe care am terminat-o.</i> este la diateza:';

            notificare.classList.add('hidden')
            final.classList.remove('hidden')

            final.innerHTML = `
            Jocul s-a terminat!
            Ai raspuns corect la ${correctWords} intrebari.
            Si au avut ${correctWords} raspunsuri gresite.`


        }

    }
    updateHintText(select_word);

    wordDiv.innerHTML = ''; // resetează div-ul de cuvinte

    // punerea cuvântului selectat
    for (let i = 0; i < select_word.length; i++) {
        const html = `<p class="word">_</p>`;
        wordDiv.insertAdjacentHTML('beforeend', html);
    }

    // Adaugă un HTML gol între cuvinte
    const emptyHtml = '<p class="word">&nbsp;</p>';
    wordDiv.insertAdjacentHTML('beforeend', emptyHtml);
}



const init = function (state) {
    wordDiv.innerHTML = '';

    if (state === 'start') {
        // putting all letters into html
        for (const i of 'aăâbcdefghiîjklmnopqrsștțuvwxyz- ') {
            const html = `<button class="alpha">${i.toUpperCase()}</button>`;
            letterDiv.insertAdjacentHTML('beforeend', html);
        }
    } else if (state === 'reset') {
        letters.forEach(btn => {
            btn.classList.remove('disabled');
            hintDiv.classList.add('hidden');
            notif.classList.add('hidden');
        });
        notif.classList.remove('Câştigat', 'Pierdut');
    }
    const hintTxt = document.querySelector('.hintText');

    select_word = words.keys().next().value;
    document.querySelector('.next-btn').addEventListener('click', nextWord);
    lives = 6;
    livesImg.src = `start.png`;
    // capturing letters div
    letters = document.querySelectorAll('.alpha');
    liveSpan.innerHTML = lives;

    // putting selected word
    for (let i = 0; i < select_word.length; i++) {
        const html = `<p class="word">_</p>`;
        wordDiv.insertAdjacentHTML('beforeend', html);
    }

    if (select_word.length >= 0) {
        hintTxt.innerHTML = 'Verbul <i class="ghilimele">mâncând</i> este la modul: ';
    } else {
        hintTxt.innerHTML = 'nimic';
    }


};

init('start');




// show notification
const showNotif = function (msg) {
    container.classList.add("blur")
    notif.classList.remove('hidden');
    notifSpan.innerHTML = select_word;
    notifContent.innerHTML = `Ai ${msg}`;
    const wrapper = document.querySelector('.wrapper');

    if (msg === 'castigat') {
        notif.classList.remove('pierdut')
        notif.classList.add('castigat');
        correctWords++

    } else if (msg === 'pierdut') {
        notif.classList.remove('castigat')
        notif.classList.add('pierdut');
        incorrectWords++
    }
    wordDiv.innerHTML = '';

    playAgain.addEventListener('click', () => {
        notif.classList.add('hidden');
        letterDiv.classList.remove('blur');
        allButtons.forEach(button => button.classList.remove('disabled'));
        livesImg.src = 'start.png';

        liveSpan.innerHTML = lives.toString();
        container.classList.remove('blur');
    });
    nextButton.addEventListener('click', () => {
        nextWord();

    });

};



// decrease life
const decreaseLife = function () {
    lives--;
    liveSpan.innerHTML = lives;
    if (lives === 0) {
        showNotif('pierdut');


    } else {
        livesImg.setAttribute('src', `${lives}.png`);
    }
};


// get multiple matching indexes of pressed letter
// to the selected word
const getindexes = function (letter) {
    let indexes = [];
    [...select_word].forEach((val, i) => {
        if (val === letter) {
            const index = i;
            indexes.push(index);
        }
    });
    //   console.log(indexes);
    return indexes;
};

// check if we get complete word
const checkWord = function () {
    let val = true;
    for (let i = 0; i < wordDiv.children.length; i++) {
        if (wordDiv.children[i].innerHTML === '_') {
            val = false;
        }
    }
    return val;
};

// letters event listener function
const letterPress = function () {
    const letter = this.innerHTML.toLowerCase();

    if (select_word.includes(letter)) {
        const indexes_list = getindexes(letter);
        indexes_list.forEach((val, i) => {
            wordDiv.children[val].innerHTML = this.innerHTML;
        });
        if (checkWord()) showNotif('castigat');
    } else {
        decreaseLife();
    }
    this.classList.add('disabled');
};

// listening to letter buttons presses
letters.forEach(btn => {
    btn.addEventListener('click', letterPress);
});

// Listening to hint btn
hintButton.addEventListener('click', function () {
    hintDiv.classList.remove('hidden');
    hintText.innerHTML = words.get(select_word);
});

// listening to reset btn
resetButton.addEventListener('click', function () {
    init('reset');
});

// listening to play again button
playAgain.addEventListener('click', function () {
    init('reset');
});
nextButton.addEventListener('click', function () {
    init('reset');

});

// 1. de modificat din ghilimele in text italic.
// 2. de tinut evidenta la raspunsurile gresite sau corecte
//  iar acestea sa apara la final, iar la cele corecte sa spuna cuvantul curect.
// 3. de adaugat event listener pe tastatura.