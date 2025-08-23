import os
from dotenv import load_dotenv
from langchain_chroma.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv() 


GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    
    raise ValueError("ERRO CRÍTICO: GOOGLE_API_KEY não encontrada no arquivo .env ou ambiente. Por favor, insira uma key.")

CAMINHO_DB = "db"
try:
    funcao_embedding = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001", 
        google_api_key=GOOGLE_API_KEY
    )
    db = Chroma(persist_directory=CAMINHO_DB, embedding_function=funcao_embedding)
    print(f"Banco de dados Chroma carregado com sucesso do diretório: {CAMINHO_DB}")
except Exception as e:
    raise RuntimeError(f"ERRO CRÍTICO: Falha ao carregar o banco de dados Chroma: {e}. Certifique-se de que o diretório 'db' existe e contém os dados.")

try:
    
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=GOOGLE_API_KEY)
    print("Modelo ChatGoogleGenerativeAI (gemini-2.5-flash) inicializado com sucesso.")
except Exception as e:
    raise RuntimeError(f"ERRO CRÍTICO: Falha ao inicializar ChatGoogleGenerativeAI (gemini-2.5-flash): {e}. Verifique sua chave API e acessibilidade do modelo.")

prompt_template = """
Você é um assistente de IA especializado em responder perguntas sobre documentos PDF.
Responda às perguntas do usuário:
{pergunta}

Com base nessas informações:
{base}

Se não souber a resposta, diga:
"Desculpe, não sei a resposta para isso."
"""
prompt = ChatPromptTemplate.from_template(prompt_template)

chain = prompt | llm

def get_rag_response(pergunta_usuario: str) -> str:
    
    if not pergunta_usuario:
        return "Nenhuma pergunta fornecida."

    resultados = []
    try:
        resultados = db.similarity_search_with_relevance_scores(pergunta_usuario, k=3)
    except Exception as e:
        print(f"ERRO: Falha na busca de similaridade do Chroma DB: {e}")
        return "Ocorreu um erro ao buscar informações no banco de dados."

    resposta_final = "Desculpe, não sei a resposta para isso." 
    
    if resultados:
       
        documentos_relevantes = [doc.page_content for doc, score in resultados if score > 0.5]
        
        if documentos_relevantes:
            base_conhecimento = "\n\n".join(documentos_relevantes)
            
            try:
                resposta_llm = chain.invoke({"pergunta": pergunta_usuario, "base": base_conhecimento})
                resposta_final = resposta_llm.content
            except Exception as e:
                print(f"ERRO ao chamar o LLM: {e}") 
                resposta_final = f"Ocorreu um erro ao gerar a resposta com a IA: {e}"
        else:
            resposta_final = "Não encontrei informações relevantes o suficiente."
    
    return resposta_final

if __name__ == "__main__":
    try:
        test_question = "Qual é o assunto principal deste documento?"
        print(f"\nTestando a função RAG com a pergunta: '{test_question}'")
        response = get_rag_response(test_question)
        print(f"Resposta do Agente RAG: {response}")
    except (ValueError, RuntimeError) as e:
        print(f"ERRO CRÍTICO NA INICIALIZAÇÃO: {e}")
