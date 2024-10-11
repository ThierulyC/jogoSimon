const colors = ["red", "blue", "green", "yellow"];
let sequence = [];
let playerSequence = [];
let score = 0;

// Iniciar o jogo
document.getElementById('start-button')?.addEventListener('click', startGame);

function startGame() {
    score = 0;
    sequence = [];
    nextSequence();
}

// Gerar a próxima sequência
function nextSequence() {
    playerSequence = [];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    document.getElementById('score').innerText = `Pontuação: ${score}`;
    showSequence();
}

// Mostrar a sequência ao jogador
function showSequence() {
    sequence.forEach((color, index) => {
        setTimeout(() => {
            flashButton(color);
        }, index *


            // Tempo entre as luzes
            1000); // 1 segundo entre cada cor
    });
}

// Piscar o botão
function flashButton(color) {
    const button = document.querySelector(`.button.${color}`);
    button.style.opacity = 1;
    setTimeout(() => {
        button.style.opacity = 0.7;
    }, 500); // Piscar por meio segundo
}

// Adicionar eventos de clique aos botões
document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('click', (event) => {
        const color = event.target.getAttribute('data-color');
        playerSequence.push(color);
        flashButton(color);
        checkSequence(playerSequence.length - 1);
    });
});

// Verificar a sequência do jogador
function checkSequence(index) {
    if (playerSequence[index] !== sequence[index]) {
        alert(`Errado! A sequência era ${sequence.join(', ')}. Você chegou a ${score} pontos!`);
        return;
    }

    if (playerSequence.length === sequence.length) {
        score++;
        setTimeout(() => {
            nextSequence();
        }, 1000); // Esperar 1 segundo antes de gerar a próxima sequência
    }
}

