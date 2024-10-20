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
                <p><strong>Nome:</strong> <input type="text" id="editNome" value="${data.nome}"></p>
                <p><strong>Telefone:</strong> <input type="text" id="editTelefone" value="${data.telefone}"></p>
                <button id="editContactButton">Editar Contato</button>
                <div id="editMessage" style="margin-top: 10px;"></div>
            `; 
   
            // Adiciona o evento de edição
            document.getElementById('editContactButton').addEventListener('click', function() {
                let new_name = document.getElementById('editNome').value;
                let new_phone = document.getElementById('editTelefone').value;

                fetch('http://127.0.0.1:5000/edit', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        old_name: data.nome, 
                        old_phone: data.telefone, 
                        new_name: new_name, 
                        new_phone: new_phone 
                    })
                })
                .then(response => response.json())
                .then(editData => {
                    // Exibe a mensagem desejada após a edição.
                    document.getElementById('editMessage').textContent = "Contato Editado e Salvo com Sucesso!";
                })
                .catch(error => console.error('Erro:', error));
            });
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
