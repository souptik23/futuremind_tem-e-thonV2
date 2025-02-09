import os
import base64
import faiss
import numpy as np
import pytesseract
from flask import Flask, request, jsonify, render_template
from PIL import Image
from dotenv import load_dotenv
from io import BytesIO
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq

# ✅ Configure Tesseract OCR Path (for Windows users)
if os.name == 'nt':
    pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

# ✅ Load environment variables
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("⚠️ GROQ_API_KEY is missing! Set it in your .env file.")

# ✅ Initialize Flask app
app = Flask(__name__)

# ✅ Load FAISS index and embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
faiss_index_path = "C:/Users/KIIT/OneDrive/Desktop/FINANCE_AI/FINANCE_FRAUD/docs/faiss_rag/"
faiss_index = FAISS.load_local(faiss_index_path, embeddings, allow_dangerous_deserialization=True)

# ✅ Initialize LLM (Groq)
llm = ChatGroq(
    groq_api_key=groq_api_key,
    model_name="deepseek-r1-distill-llama-70b",
    temperature=0.1
)

# ✅ Define the fraud detection prompt template
# Define the prompt template
template = """
You are an Fraud Detection Expert in Financial Text Data, Analyse them and Predict is the Given Statement is Fraud or not?. If you don't know the answer, just say "Sorry, I Don't Know."
Question: {question} 
Context: {context} 
Answer:
"""
PROMPT = PromptTemplate(input_variables=["context", "query"], template=template)

# Ensure llm and langchain_chroma are properly initialized
retriever = faiss_index.as_retriever(search_kwargs={"k": 1})

qa_chain = RetrievalQA.from_chain_type(
    llm, retriever=retriever, chain_type_kwargs={"prompt": PROMPT}
)

# ✅ Function to extract text from images using OCR
def extract_text_from_image(image_path):
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        return f"⚠️ OCR Error: {str(e)}"

# ✅ Function to process base64 image data (from camera capture)
def extract_text_from_base64(base64_str):
    try:
        image_data = base64.b64decode(base64_str.split(",")[1])
        image = Image.open(BytesIO(image_data))
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        return f"⚠️ OCR Error: {str(e)}"

# ✅ Route: Home Page
@app.route("/")
def index():
    return render_template("index.html")

# ✅ Route: Analyze uploaded financial statement
@app.route("/analyze", methods=["POST"])
def analyze():
    text = None

    # If file is uploaded (image or text)
    if "file" in request.files:
        file = request.files["file"]
        file_path = os.path.join("uploads", file.filename)
        os.makedirs("uploads", exist_ok=True)
        file.save(file_path)

        if file.filename.lower().endswith((".png", ".jpg", ".jpeg", ".pdf")):
            text = extract_text_from_image(file_path)
        else:
            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read().strip()

    # If manual text input
    elif "text" in request.form:
        text = request.form["text"].strip()

    if not text:
        return jsonify({"error": "No valid input provided"}), 400

    # Run fraud detection
    try:
        result = qa_chain({"query": text})
        return jsonify({"text": text, "fraud_prediction": result["result"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
