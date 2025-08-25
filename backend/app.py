from flask import Flask, request, jsonify
from flask_cors import CORS 
from rag_agent import get_rag_response 

app = Flask(__name__)
CORS(app) 

@app.route("/perguntar", methods=["POST"])
def responder_pergunta():
    dados = request.get_json()
    pergunta_usuario = dados.get("pergunta")

    if not pergunta_usuario:
        return jsonify({"erro": "O campo 'pergunta' é obrigatório."}), 400

    resposta_final = get_rag_response(pergunta_usuario)
    
    
    return jsonify({"resposta": resposta_final})

if __name__ == "__main__":
    app.run(debug=True)

# Implementar rota de upload para receber PDFs e atualizar o banco de dados
# implementar validação no backend para garantir que apenas PDFs sejam aceitos
# no frontend implementar o uppy para fazer upload dos arquivos