from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Esta linha permite requisições de qualquer origem #

# Configurações do banco de dados #
conn = psycopg2.connect(
    host="localhost",
    database="agenda_telefonica",
    user="postgres",
    password="K@r@lh10"
)

@app.route('/add', methods=['POST'])
def add_contact():
    try:
        data = request.get_json()
        nome = data['nome']
        telefone = data['telefone']

        cursor = conn.cursor()
        # Verifica se o contato já existe #
        cursor.execute("SELECT COUNT(*) FROM contatos WHERE nome = %s AND telefone = %s", (nome, telefone))
        count = cursor.fetchone()[0]

        if count > 0:
            cursor.close()
            return jsonify({"message": "Contato já existe!"}), 400

        cursor.execute("INSERT INTO contatos (nome, telefone) VALUES (%s, %s)", (nome, telefone))
        conn.commit()
        cursor.close()

        return jsonify({"message": "Contato salvo com sucesso!"})

    except Exception as e:
        return jsonify({"message": f"Erro ao salvar contato: {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
