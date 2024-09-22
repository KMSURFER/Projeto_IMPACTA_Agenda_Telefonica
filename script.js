// Evento de adicionar contato
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('telefone').value;

    fetch('http://127.0.0.1:5000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nome, telefone: telefone })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
        // Limpar os campos
        document.getElementById('nome').value = '';
        document.getElementById('telefone').value = '';
    })
    .catch(error => console.error('Erro:', error));
});

// Mostrar campo de busca ao clicar no botão "Procurar Contato"
document.getElementById('searchButton').addEventListener('click', function() {
    document.getElementById('searchDiv').style.display = 'block';
});

// Evento de busca
document.getElementById('searchContactButton').addEventListener('click', function() {
    let searchValue = document.getElementById('searchInput').value;

    fetch('http://127.0.0.1:5000/search', {
        method: 'POST',  // Assegure que o método é POST
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: searchValue })
    })
    .then(response => response.json())
    .then(data => {
        let searchResultDiv = document.getElementById('searchResult');
        if (data.error) {
            searchResultDiv.textContent = data.error;
        } else {
            searchResultDiv.innerHTML = `
                <p><strong>Nome:</strong> ${data.nome}</p>
                <p><strong>Telefone:</strong> ${data.telefone}</p>
                <p>Contato encontrado com sucesso!</p>
            `;
        }
    })
    .catch(error => console.error('Erro:', error));
});

// Evento de limpar busca
document.getElementById('clearSearchButton').addEventListener('click', function() {
    // Limpar o campo de busca e o resultado
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResult').innerHTML = '';
});
