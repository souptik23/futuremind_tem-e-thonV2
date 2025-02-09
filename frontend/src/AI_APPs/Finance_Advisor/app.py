from flask import Flask, request, jsonify, render_template
import os
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_community.embeddings import HuggingFaceEmbeddings  # Updated import
from langchain_community.vectorstores import FAISS  # Updated import
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
import pandas as pd
from langchain.docstore.document import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Load environment variables
load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv("GROQ_API_KEY")

# Initialize Flask app
app = Flask(__name__)

# Load financial data and preprocess it
df = pd.read_csv('C:/Users/KIIT/OneDrive/Desktop/FINANCE_AI/Finance_data.csv')
df_fin = df.to_dict(orient='records')

# Convert data into prompt-response format
prompt_response_data = []
for entry in df_fin:
    prompt = f"I'm a {entry['age']}-year-old {entry['gender']} looking to invest in {entry['Avenue']} for {entry['Purpose']} over the next {entry['Duration']}. What are my options?"
    response = (
        f"Based on your preferences, here are your investment options:\n"
        f"- Mutual Funds: {entry['Mutual_Funds']}\n"
        f"- Equity Market: {entry['Equity_Market']}\n"
        f"- Debentures: {entry['Debentures']}\n"
        f"- Government Bonds: {entry['Government_Bonds']}\n"
        f"- Fixed Deposits: {entry['Fixed_Deposits']}\n"
        f"- PPF: {entry['PPF']}\n"
        f"- Gold: {entry['Gold']}\n"
        f"Factors considered: {entry['Factor']}\n"
        f"Objective: {entry['Objective']}\n"
        f"Expected returns: {entry['Expect']}\n"
        f"Investment monitoring: {entry['Invest_Monitor']}\n"
        f"Reasons for choices:\n"
        f"- Equity: {entry['Reason_Equity']}\n"
        f"- Mutual Funds: {entry['Reason_Mutual']}\n"
        f"- Bonds: {entry['Reason_Bonds']}\n"
        f"- Fixed Deposits: {entry['Reason_FD']}\n"
        f"Source of information: {entry['Source']}\n"
    )
    prompt_response_data.append({"prompt": prompt, "response": response})

# Store data in vector DB
documents = [Document(page_content=f"Prompt: {entry['prompt']}\nResponse: {entry['response']}") for entry in prompt_response_data]

text_splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=10)
texts = text_splitter.split_documents(documents)

faiss_index = FAISS.load_local(
    'C:/Users/KIIT/OneDrive/Desktop/FINANCE_AI/FINANCIAL_RECOMENDATION/docs/faiss_rag/', 
    HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"),
    allow_dangerous_deserialization=True
)


# Define the prompt template
# Groq API setup
llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name='gemma2-9b-it',
    temperature=0.1
)

# Define the prompt template
template = """
You are an experienced financial advisor. Based on the given customer information, provide the best investment advice tailored to their needs.

Customer Information: {query}
Context: {context}

Answer:
"""
PROMPT = PromptTemplate(input_variables=["context", "query"], template=template)

retriever = faiss_index.as_retriever(search_kwargs={"k": 1})

qa_chain = RetrievalQA.from_chain_type(
    llm, retriever=retriever, chain_type_kwargs={"prompt": PROMPT}
)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_recommendation', methods=['POST'])
def get_recommendation():
    data = request.json
    query = (f"I'm a {data['age']}-year-old {data['gender']} looking to invest in "
             f"{data['avenue']} for {data['purpose']} over the next {data['duration']}. What are my best options?")

    # Ensure proper input structure
    result = qa_chain.invoke({"query": query, "context": ""})  # Added 'context' key

    return jsonify({"response": result.get("result", "No recommendation found.")})

if __name__ == '__main__':
    app.run(debug=True)
