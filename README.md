# 🚀 Agente RAG com Next.js e Flask 🤖

Este projeto implementa um assistente de IA conversacional que utiliza a arquitetura RAG (Retrieval-Augmented Generation) para responder a perguntas com base em um banco de dados de documentos PDF. O frontend é construído com Next.js para uma experiência de usuário interativa, enquanto o backend em Flask lida com o processamento das perguntas, a busca de informações no banco de dados ChromaDB e a interação com o modelo de linguagem Gemini-2.5-Flash.

## ✨ Funcionalidades
- **Resposta Contextual** 📚: O assistente responde a perguntas com base em documentos PDF armazenados localmente, garantindo respostas relevantes e específicas.
- **Eficiência de Tokens** 📉: Utiliza RAG para buscar apenas as informações mais pertinentes, reduzindo o consumo de tokens na chamada do modelo de IA.
- **Interface Intuitiva** 💬: Um frontend moderno com Next.js que proporciona uma experiência de chat amigável e reativa.
- **Temas Personalizáveis** 🎨: Escolha entre diferentes temas (Default, Playlist, Aires) para personalizar a aparência do aplicativo, com cores dinâmicas para elementos da interface, incluindo histórico e input.
- **Histórico de Conversa** 📜: Acompanhe suas perguntas e as respostas do assistente em um painel de histórico claro.
- **Botão de Reset** 🔄: Limpe o histórico de conversa e o campo de input facilmente.

## 🛠️ Tecnologias Utilizadas

### Frontend (Next.js)
- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **React Markdown**: Para renderizar respostas da IA em formato Markdown.

### Backend (Flask)
- **Python**: Linguagem de programação.
- **Flask**: Microframework web para Python.
- **LangChain**: Framework para desenvolvimento de aplicações com LLMs.
- **ChromaDB**: Banco de dados vetorial de código aberto para armazenamento de embeddings.
- **Google Generative AI (Gemini-2.5-Flash)**: Modelo de linguagem grande para geração de texto.
- **python-dotenv**: Para gerenciar variáveis de ambiente.
- **Flask-Cors**: Para lidar com políticas de CORS.

## 📋 Requisitos
Para executar este projeto, você precisará ter instalado:
- Node.js (versão 18.x ou superior)
- npm ou Yarn (gerenciador de pacotes para Node.js)
- Python (versão 3.9 ou superior)
- pip (gerenciador de pacotes para Python)

## ⚙️ Configuração do Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/caio-kenai/agente_rag-com-next-e-flask
cd meu-projeto-ia
```

### 2. Configuração do Backend (Flask)
Navegue até a pasta do backend (onde está o rag_agent.py e app.py).
```bash
cd agente_rag-com-next-e-flask\backend
```

#### a. Criar Ambiente Virtual e Instalar Dependências:
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Se preferir instalar manualmente rode:
```bash
pip install Flask Flask-Cors python-dotenv langchain langchain-google langchain-openai langchain-community langchain-chroma chromadb openai google-generativeai langchain-google-genai pypdf
```

#### b. Configurar Chave de API do Google Gemini:
O arquivo `.env` já existe na raiz da pasta do backend.

Obtenha sua chave de API do Google Gemini (necessita de uma conta Google Cloud e habilitar a API Gemini).

Adicione a chave ao arquivo `.env`:
```env
GOOGLE_API_KEY="SUA_CHAVE_DE_API_DO_GOOGLE"
```

#### c. Preparar o Banco de Dados ChromaDB:
O script `criar_db.py` é responsável por carregar seus documentos PDF e gerar o banco de dados vetorial ChromaDB automaticamente.

A pasta `base` já está incluída no projeto e contém um manual padrão.

Altere o manual existente ou adicione seus próprios arquivos PDF a esta pasta `base` na raiz do seu backend (na mesma pasta do rag_agent.py).

Execute o script `criar_db.py`:
```bash
python criar_db.py
```
Este comando irá processar os PDFs na pasta base e criar (ou atualizar) a pasta `db` com o banco de dados Chroma.

#### d. Iniciar o Servidor Flask:
```bash
flask run
```
O backend estará rodando em `http://127.0.0.1:5000`.

### 3. Configuração do Frontend (Next.js)
Navegue até a pasta do frontend (onde está o app/page.tsx).
```bash
cd agente_rag-com-next-e-flask\meu-projeto-ia
```

#### a. Instalar Dependências:
```bash
npm install # ou yarn install
```

#### b. Configurar Tailwind CSS (se necessário):
Se o Tailwind CSS ainda não estiver configurado em seu projeto Next.js, siga as instruções oficiais de instalação do Tailwind para Next.js. Isso geralmente envolve:

Instalar os pacotes Tailwind:
```bash
npm install -D tailwindcss postcss autoprefixer
```

Inicializar o Tailwind e criar os arquivos de configuração:
```bash
npx tailwindcss init -p
```

Configurar os caminhos para seus arquivos no `tailwind.config.js`.

Adicionar as diretivas Tailwind ao seu arquivo CSS global (ex: `app/globals.css`).

#### c. Iniciar o Servidor de Desenvolvimento:
```bash
npm run dev # ou yarn dev
```
O frontend estará acessível em `http://localhost:3000`.

## 🚀 Como Usar
1. Abra o frontend no seu navegador (`http://localhost:3000`).
2. Escolha um tema clicando no botão "Style".
3. Digite sua pergunta na caixa de texto.
4. Clique em "Perguntar" para enviar sua pergunta ao agente de IA.
5. A resposta aparecerá abaixo do campo de pergunta, e o histórico será atualizado no painel esquerdo.
6. Use o botão "Reset" para limpar a conversa e começar de novo.

## 🎨 Temas Disponíveis
- **Default ⚪**: Um tema neutro com tons de cinza e branco para uma aparência limpa.
- **Playlist 🔵**: Um tema em tons de azul com detalhes retrô, para uma experiência leve e nostálgica, simulando o software Playlist Digital.
- **Aires 🟢**: Um tema escuro com detalhes em verde-água, para uma experiência moderna e de alto contraste, simulando o software Aires Studio.
