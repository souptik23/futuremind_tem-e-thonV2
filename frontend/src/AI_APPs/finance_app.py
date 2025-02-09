import streamlit as st
import pandas as pd
from newsapi import NewsApiClient
from datetime import datetime, timedelta
from transformers import pipeline
import urllib.parse

# Initialize News API client
API_KEY = "b82276461b68436fa5a5b61891db4625"  # Replace with your actual API key
newsapi = NewsApiClient(api_key=API_KEY)

# Initialize the summarization model
llm_summarizer = pipeline(
    "summarization",
    model="Falconsai/text_summarization",
    model_kwargs={"temperature": 0.1, "max_length": 500, "min_length": 300}
)

def fetch_news(query, from_date, to_date, language='en', sort_by='relevancy', page_size=10):
    query = urllib.parse.quote(query)
    try:
        articles = newsapi.get_everything(q=query, from_param=from_date, to=to_date,
                                          language=language, sort_by=sort_by, page_size=page_size)
        if articles.get('status') == 'ok' and articles.get('totalResults', 0) > 0:
            df = pd.DataFrame(articles['articles'])
            return df
        else:
            return pd.DataFrame()
    except Exception as e:
        st.error(f"Error fetching news: {e}")
        return pd.DataFrame()

def preprocess_news(df):
    if 'publishedAt' in df.columns:
        df['publishedAt'] = pd.to_datetime(df['publishedAt']).dt.date
    return df

def build_prompt(news_df):
    prompt = "You are a Financial Analyst tasked with analyzing recent financial news and especially focus in stocks and finances. Here are the latest articles:\n"
    for _, row in news_df.iterrows():
        prompt += f"**NEWS:** {row['title']}\n"
    prompt += "\nPlease summarize and provide insights on potential industry impacts."
    return prompt

def summarize_news(prompt):
    summary = llm_summarizer(prompt)
    return summary[0]['summary_text']

# Streamlit UI
st.title("Financial News Summarizer")
st.sidebar.header("Search Settings")

query = st.sidebar.text_input("Enter a financial topic:", "NVIDIA")
date_range = st.sidebar.slider("Select date range:", 1, 30, 7)
end_date = datetime.now()
start_date = end_date - timedelta(days=date_range)
fetch_button = st.sidebar.button("Fetch & Summarize News")

if fetch_button:
    st.subheader(f"Latest News on {query}")
    df_news = fetch_news(query, start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d'))
    if not df_news.empty:
        df_news = preprocess_news(df_news)
        st.write(df_news[['title', 'publishedAt', 'url']])
        prompt = build_prompt(df_news)
        summary = summarize_news(prompt)
        st.subheader("Summary & Insights")
        st.write(summary)
    else:
        st.write("No news articles found.")
