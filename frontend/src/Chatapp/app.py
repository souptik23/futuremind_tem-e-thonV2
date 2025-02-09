from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import FAISS  # Updated import
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_community.embeddings import HuggingFaceEmbeddings  # Updated import
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv("GROQ_API_KEY")

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React frontend

# Load FAISS index
faiss_path_bank = "C:/Users/KIIT/Desktop/CODE/bankbandhu/BANKBANDHU_REACTaPP/FAINANCE_V2/frontend/src/ChatApp/Personalized_Chatbot/docs/faiss_rag/"

# Load embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Load FAISS index with dangerous deserialization enabled
try:
    faiss_index_bank = FAISS.load_local(faiss_path_bank, embeddings, allow_dangerous_deserialization=True)
except RuntimeError as e:
    print(f"Error loading FAISS index: {e}")
    faiss_index_bank = None

# Groq API setup
llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name='gemma2-9b-it',
    temperature=0.1
)

# Prompt Template
template = """
You are a Finance QNA Expert. Analyze the Query and Respond to the Customer with a suitable answer within 150 words. If you don't know the answer, just say "Sorry, I don't know."
Question: {question}
Context: {context}
Answer:
"""
PROMPT = PromptTemplate(input_variables=["context", "query"], template=template)

# Create retriever
if faiss_index_bank:
    retriever_bank = faiss_index_bank.as_retriever(search_kwargs={"k": 1})
else:
    retriever_bank = None

# Define QA Chain
if retriever_bank:
    qa_chain_bank = RetrievalQA.from_chain_type(llm, retriever=retriever_bank, chain_type_kwargs={"prompt": PROMPT})
else:
    qa_chain_bank = None

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_query = data.get("message", "")

    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    if not qa_chain_bank:
        return jsonify({"error": "FAISS index not loaded"}), 500

    try:
        context = "Your context here"  # Modify this as needed
        result = qa_chain_bank({"context": context, "query": user_query})
        return jsonify({"response": result["result"]})  # Respond in JSON format
    except RuntimeError as e:
        return jsonify({"error": f"RuntimeError encountered: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)