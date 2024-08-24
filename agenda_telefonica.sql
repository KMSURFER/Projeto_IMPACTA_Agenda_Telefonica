-- Comando usado no PostgreSQL para criar o Banco de Dados
CREATE DATABASE agenda_telefonica;

-- Comando usado no PostgreSQL para criar a tabela Contatos
CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    telefone VARCHAR(15)
);

-- Comando usado para consultar a tabela Contatos
SELECT * FROM contatos;

-- Comando usado no PostgreSQL para Deletar Contatos direto da tabela Contatos
DELETE FROM contatos
WHERE nome = 'Nome do Contato' AND telefone = 'Numero do Contato';



