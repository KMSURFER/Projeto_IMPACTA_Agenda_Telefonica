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
