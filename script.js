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
        method: 'POST',
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
                <button id="deleteContactButton" style="background-color: red; color: white;">Apagar Contato</button>
                <div id="editMessage" style="margin-top: 10px;"></div>
            `;

            document.getElementById('editContactButton').addEventListener('click', function() {
                let newNome = document.getElementById('editNome').value;
                let newTelefone = document.getElementById('editTelefone').value;

                fetch('http://127.0.0.1:5000/edit', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        old_name: data.nome, 
                        old_phone: data.telefone, 
                        new_name: newNome, 
                        new_phone: newTelefone 
                    })
                })
                .then(response => response.json())
                .then(editData => {
                    document.getElementById('editMessage').textContent = editData.message;
                })
                .catch(error => console.error('Erro:', error));
            });

            document.getElementById('deleteContactButton').addEventListener('click', function() {
                let contactName = data.nome; // Capture o nome do contato

                fetch('http://127.0.0.1:5000/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        nome: contactName, 
                        telefone: data.telefone 
                    })
                })
                .then(response => response.json())
                .then(deleteData => {
                    document.getElementById('editMessage').textContent = `${contactName} foi excluído com sucesso!`;
                    searchResultDiv.innerHTML = ''; // Limpa os campos de busca após a exclusão
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
