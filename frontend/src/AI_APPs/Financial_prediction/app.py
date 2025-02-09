import streamlit as st
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
import os
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv("GROQ_API_KEY")

# Configuration
FAISS_PATH = "C:/Users/KIIT/OneDrive/Desktop/FINANCE_AI/Finance_prediction/docs/faiss_rag"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# Initialize components
embeddings = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL)
faiss_db = FAISS.load_local(
    folder_path=FAISS_PATH,
    embeddings=embeddings,
    allow_dangerous_deserialization=True
)

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name='gemma2-9b-it',
    temperature=0.1
)

    # Define the prompt template
template = """
You are an Credit Risk Expert in Financial Text Data, Analyse them and Predict is the Given Customer is going to Default or not?. If you don't know the answer, just say "Sorry, I Don't Know."
Question: {question}
Context: {context}
Answer:
"""
PROMPT = PromptTemplate(input_variables=["context", "query"], template=template)

retriever = faiss_db.as_retriever(search_kwargs={"k": 3, "score_threshold": 0.6})


qa_chain = RetrievalQA.from_chain_type(
    llm, retriever=retriever, chain_type_kwargs={"prompt": PROMPT}
)

# Helper Functions
def format_currency(value):
    try:
        return f"${float(value):,}"
    except (ValueError, TypeError):
        return "N/A"

def extract_confidence(response: str) -> float:
    match = re.search(r"\*\*Confidence\*\*: (\d+)%", response)
    return min(float(match.group(1)) / 100, 1.0) if match else 0.75

def format_response(response: str) -> str:
    return response.replace('**', '').replace('\n', '\n')

# Streamlit UI
st.set_page_config(page_title="Loan Risk Analysis App", layout="wide")
st.title("📊 Loan Risk Assessment Tool")

with st.form("loan_form"):
    st.subheader("Enter Loan Application Details")

    col1, col2 = st.columns(2)
    with col1:
        age = st.number_input("Age", min_value=18, max_value=100, value=30)
        income = st.number_input("Annual Income ($)", value=50000)
        loan_amount = st.number_input("Loan Amount ($)", value=10000)
        credit_score = st.number_input("Credit Score", min_value=300, max_value=850, value=700)
        months_employed = st.number_input("Months Employed", value=24)
        credit_lines = st.number_input("Number of Credit Lines", value=5)

    with col2:
        interest_rate = st.slider("Interest Rate (%)", 0.0, 30.0, 5.0)
        loan_term = st.number_input("Loan Term (Months)", value=36)
        dti_ratio = st.slider("Debt-to-Income Ratio", 0.0, 1.0, 0.3)
        education = st.selectbox("Education Level", ["High School", "Associate", "Bachelor's", "Master's", "Doctorate"])
        employment_type = st.selectbox("Employment Type", ["Full-time", "Part-time", "Self-employed", "Unemployed"])
        marital_status = st.selectbox("Marital Status", ["Single", "Married", "Divorced", "Widowed"])

    has_mortgage = st.checkbox("Has Mortgage")
    has_dependents = st.checkbox("Has Dependents")
    loan_purpose = st.text_input("Loan Purpose", "Personal")
    has_cosigner = st.checkbox("Has Co-Signer")

    submit_button = st.form_submit_button("Analyze Application")

if submit_button:
    query_prompt = f"""
    Loan Application Analysis:
    - Age: {age}
    - Income: {format_currency(income)}
    - Loan Amount: {format_currency(loan_amount)}
    - Credit Score: {credit_score}
    - Employment: {months_employed} months
    - Credit Lines: {credit_lines}
    - Interest Rate: {interest_rate}%
    - Loan Term: {loan_term} months
    - DTI Ratio: {dti_ratio}
    - Education: {education}
    - Employment Type: {employment_type}
    - Marital Status: {marital_status}
    - Mortgage: {'Yes' if has_mortgage else 'No'}
    - Dependents: {'Yes' if has_dependents else 'No'}
    - Purpose: {loan_purpose}
    - Co-Signer: {'Yes' if has_cosigner else 'No'}
    """

    with st.spinner('Analyzing...'):
        context_docs = retriever.get_relevant_documents(query_prompt.strip())
        context = "\n".join([doc.page_content for doc in context_docs])

        result = qa_chain.invoke({
            "context": context,
            "query": query_prompt.strip()
        })

    st.subheader("🔍 Analysis Results")
    st.markdown(format_response(result['result']))
    st.progress(extract_confidence(result['result']))

    # with st.expander("📄 Source Documents"):
    #     for doc in result['source_documents']:
    #         st.text(doc.page_content[:300] + "...")
