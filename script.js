const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector(".content button");

//set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

btn.addEventListener("click", reset);

function reset() {
    loadParagraph();
    maxTime = 60;
    timeLeft = maxTime;
    charIndex = 0;
    isTyping = false;
    loadParagraph();

}

function loadParagraph() {
    const paragraph = [
        "The quick brown fox jumps over the lazy dog.",
        "This is a sentence. This is another sentence. This is a third sentence.",
        "The early bird catches the worm.",
        "Practice makes perfect.",
        "Time flies like an arrow. Fruit flies like a banana.",
        "A stitch in time saves nine.",
        "The pen is mightier than the sword.",
        "In three words I can sum up everything I've learned about life: it goes on.",
        "The only way to do great work is to love what you do.",
        "The grass is always greener on the other side.",
        "Actions speak louder than words. This proverb emphasizes the importance of following through on one's words with actions.",
        "Every cloud has a silver lining. This proverb suggests that even difficult situations can have positive outcomes."
    ]

    const randInd = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = '';
    for (const char of paragraph[randInd]) {
        typingText.innerHTML += `<span>${char}</span>`
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", () => {
        input.focus();
    });
    typingText.addEventListener("click", () => {
        input.focus();
    });
}

//handle user input
function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if (charIndex < char.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add("correct");
            console.log("correct");
        } else {
            mistake++;
            char[charIndex].classList.add("incorrect");
            console.log("Incorrect");
        }
        charIndex++;
        mistakes.innerText = mistake;
        char[charIndex].classList.add("active");
        cpm.innerText = charIndex - mistake;
    } else {
        clearInterval(timer);
        input.value = '';
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        const wpmNum = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmNum;
    } else {
        clearInterval(timer);
    }
}

input.addEventListener("input", initTyping);

loadParagraph();