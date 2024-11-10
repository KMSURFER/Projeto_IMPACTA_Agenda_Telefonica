from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Permite requisições de qualquer origem

# Configurações do banco de dados
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
        # Verifica se o contato já existe
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

@app.route('/search', methods=['POST'])
def search_contact():
    try:
        data = request.get_json()
        search_value = data['search']

        cursor = conn.cursor()
        cursor.execute("SELECT nome, telefone FROM contatos WHERE nome ILIKE %s OR telefone ILIKE %s", 
                       (f'%{search_value}%', f'%{search_value}%'))
        contact = cursor.fetchone()
        cursor.close()

        if contact:
            return jsonify({"nome": contact[0], "telefone": contact[1]})
        else:
            return jsonify({"error": "Contato não encontrado!"}), 404

    except Exception as e:
        return jsonify({"error": f"Erro ao procurar contato: {e}"}), 500

@app.route('/edit', methods=['PUT'])
def edit_contact():
    try:
        data = request.get_json()
        old_name = data['old_name']
        old_phone = data['old_phone']
        new_name = data['new_name']
        new_phone = data['new_phone']

        cursor = conn.cursor()
        cursor.execute("UPDATE contatos SET nome = %s, telefone = %s WHERE nome = %s AND telefone = %s",
                       (new_name, new_phone, old_name, old_phone))
        conn.commit()
        cursor.close()

        return jsonify({"message": "Contato editado e salvo com sucesso!"})

    except Exception as e:
        return jsonify({"error": f"Erro ao editar contato: {e}"}), 500

@app.route('/delete', methods=['DELETE'])
def delete_contact():
    try:
        data = request.get_json()
        nome = data['nome']
        telefone = data['telefone']

        cursor = conn.cursor()
        cursor.execute("DELETE FROM contatos WHERE nome = %s AND telefone = %s", (nome, telefone))
        conn.commit()
        cursor.close()

        return jsonify({"message": "Contato deletado com sucesso!"})
    except Exception as e:
        return jsonify({"error": f"Erro ao deletar contato: {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
