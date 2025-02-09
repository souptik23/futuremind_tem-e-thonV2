from flask import Flask, render_template, request, jsonify
import json
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv("GROQ_API_KEY")

# Initialize Flask app
app = Flask(__name__)

# Load FAISS index
faiss_index = FAISS.load_local(
    'C:/Users/KIIT/OneDrive/Desktop/FINANCE_AI/FINANCIAL_RECOMENDATION/docs/faiss_rag/', 
    HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"),
    allow_dangerous_deserialization=True
)

# Groq API setup
llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name='gemma2-9b-it',
    temperature=0.1
)

# Define the prompt template
template = """
Based on the following customer data that I provide, suggest one suitable banking lending product. Also, determine which type of loan and credit card is suitable for the customer. If you don't know the answer, just say "Sorry, I Don't Know."

Customer Information: {question}
Context: {context}

Answer:
If the customer requires further personalized assistance, they can contact our professionals directly through our app for expert financial advice.
"""

PROMPT = PromptTemplate(input_variables=["context", "query"], template=template)

retriever = faiss_index.as_retriever(search_kwargs={"k": 1})

qa_chain = RetrievalQA.from_chain_type(
    llm, retriever=retriever, chain_type_kwargs={"prompt": PROMPT}
)

# Income level classification
def classify_income(income):
    income = float(income)  # Convert income to float to avoid type errors
    if income < 400000:
        return "Low"
    elif 400000 <= income <= 1000000:
        return "Medium"
    else:
        return "High"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    income_level = classify_income(data.get('annual_income', 0))

    customer_data = {
        "Age": data.get('age'),
        "Gender": data.get('gender'),
        "Marital Status": data.get('marital_status'),
        "Income Level": income_level,
        "Education": data.get('education'),
        "Occupation": data.get('occupation'),
        "Residential Status": data.get('residential_status'),
        "Dependents": data.get('dependents'),
        "Debt-to-Income": data.get('debt_to_income'),
        "Credit_Bureau": data.get('credit_bureau')
    }

    data_string = json.dumps(customer_data, indent=4)

    try:
        docs = retriever.get_relevant_documents(data_string)
        context = "\n".join([doc.page_content for doc in docs])

        result = qa_chain.invoke({"query": data_string, "context": context})

        return jsonify({'result': result['result']})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/ask', methods=['POST'])
def ask():
    query = request.json.get('query')
    try:
        response = llm.invoke(query)  # Returns AIMessage object
        response_text = response.content  # Extract text content
        return jsonify({'result': response_text})  # ✅ Now it's JSON serializable
    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    app.run(debug=True)
