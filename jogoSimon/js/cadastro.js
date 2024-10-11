// Função para salvar a pontuação no ranking
function saveScore(username, score) {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const existingUser = ranking.find(user => user.nome === username);

    if (existingUser) {
        existingUser.pontuacao = Math.max(score, existingUser.pontuacao); // Atualiza a pontuação se maior
    } else {
        ranking.push({ nome: username, pontuacao: score, dataHora: new Date().toLocaleString() });
    }

    ranking.sort((a, b) => b.pontuacao - a.pontuacao); // Ordena o ranking
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

// Função para atualizar e exibir o ranking
function updateRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = ''; // Limpa a lista existente

    ranking.forEach((user, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${index + 1}. ${user.nome} - ${user.pontuacao} pontos`;
        rankingList.appendChild(listItem);
    });
}

// Atualiza o ranking ao terminar o jogo
function checkSequence(currentIndex) {
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        alert(`Errado! A sequência era ${sequence.join(', ')}. Você fez ${score} pontos!`);
        
        const currentUser = localStorage.getItem('currentUser'); // Certifique-se de pegar o usuário aqui
        saveScore(currentUser, score); // Salva a pontuação no ranking
        updateRanking(); // Atualiza o ranking
        return; // Termina o jogo se errar
    }

    // Se acertar toda a sequência
    if (playerSequence.length === sequence.length) {
        score++;
        document.getElementById('score').innerText = `Pontuação: ${score}`; // Atualiza a pontuação na tela
        setTimeout(() => {
            nextSequence();
        }, 1000); // Aguardar 1 segundo antes de mostrar a próxima sequência
    }
}

// Atualiza o ranking ao carregar a página
window.onload = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('username-display').innerText = `Bem-vindo, ${currentUser}`;
        updateRanking(); // Atualiza o ranking quando o usuário loga
    } else {
        alert('Você precisa estar logado para jogar.');
        window.location.href = 'login.html';
    }
};
