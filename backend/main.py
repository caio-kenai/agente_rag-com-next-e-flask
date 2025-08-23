from rag_agent import get_rag_response

pergunta = input("Escreva sua pergunta: ")

resposta = get_rag_response(pergunta)
print(resposta)