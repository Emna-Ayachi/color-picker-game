const ColorPreview=document.querySelector('.color-preview');
const ColorButtons = document.querySelectorAll('.choice button');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('continue-btn');
let attempts = 0;

function setColor(){
    const randomColor = getRandomColor();
    ColorPreview.style.backgroundColor = randomColor;
    ColorButtons.forEach(button => {
        const randomColor = getRandomColor();
        button.style.backgroundColor = randomColor;
        button.disabled = false;
    });
    const randomIndex = Math.floor(Math.random() * ColorButtons.length);
    ColorButtons[randomIndex].style.backgroundColor = randomColor;
}
function getRandomColor(){
    const r=Math.floor(Math.random()*256);
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
}

ColorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculateScore(button);
    });
});
let score=0;
function updateScore() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Score: ${score}`;
}
function calculateScore(button){
    attempts++;
    if (button.style.backgroundColor===ColorPreview.style.backgroundColor){
        score++;
        updateScore();
        disableButtons();
    }else{
        disableButtons();
    }
    if (attempts === 10) {
        if (score === 10) {
            resetButton.disabled = true;
            messageDisplay.textContent = "Game Over! 🎉 Congratulations! You've got all answers correct! Press Reset to play again.";
        } else {
            resetButton.disabled = true;
            messageDisplay.textContent = "Game Over! 😔 You Lost! Press Reset to play again.";
        }
        disableButtons();
    }
}
function disableButtons() {
    ColorButtons.forEach(button => {
        button.disabled = true;  
    });
}

resetButton.addEventListener('click', () => {
    setColor();  
    ColorButtons.forEach(button => {
        button.disabled = false;
    });
});
const reset=document.getElementById('reset');
reset.addEventListener('click',()=>{
    score=0;
    attempts=0;
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Score: ${score}`;
    messageDisplay.textContent = "";
    resetButton.disabled = false;
    setColor();
    ColorButtons.forEach(button => {
        button.disabled = false; 
    });
});
setColor();