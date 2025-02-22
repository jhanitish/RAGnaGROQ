# RAGnaGROQ: Gen AI Educational and Utility Assistant

Welcome to the Gen AI Educational and Utility Assistant project! This platform provides multiple AI-powered tools to assist with various tasks such as educational search, LeetCode assistance, text summarization, and more. The project leverages advanced generative AI models like `Llama3-8b-8192` and `Mixtral-8x7b-32768` to deliver precise and meaningful results.

---

## Project Website
https://ragnagroq.onrender.com/

---

## Features

### 1. **Search Engine**
   - **Route**: `/search-engine`
   - **Description**: An educational generative AI assistant using `Llama3-8b-8192` to provide contextual search results and answers to your queries.
   - **Status**: Available

### 2. **Leetcode Assistant**
   - **Route**: `/leetcode-bot`
   - **Description**: A coding assistant that provides hints, solutions, and study plans for LeetCode problems using the `Mixtral-8x7b-32768` model.
   - **Status**: Available

### 3. **PDF Text Summarization**
   - **Route**: `/text-summerize`
   - **Description**: Quickly summarize the content of large PDF documents.
   - **Status**: Work in progress

### 4. **ATS Resume Assistant**
   - **Route**: `/ats`
   - **Description**: An assistant to analyze and optimize resumes for ATS (Applicant Tracking Systems).
   - **Status**: Coming Soon

### 5. **Pets Nutrition Assistant**
   - **Route**: `/pet-nutrition`
   - **Description**: An AI assistant to guide pet owners on optimal nutrition for their pets.
   - **Status**: Coming Soon

---
## Technology Stack

## Frontend
- Javascript
- React JS
- Shadcn
- Tailwind

## Backend
- Python
- Groq
- Langchain
- Fastapi
  
---

## Getting Started

To use the platform, follow these steps:

### Prerequisites
- **Node.js** (version 14 or higher)
- **Python** (version 10 or higher)
- A valid **Groq API Key** for accessing AI models.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jhanitish/RAGnaGROQ.git
   cd RAGnaGROQ
   cd frontend
   npm install
   npm start
   open a new terminal
   cd backend
   pip install -r requirements.txt
   python run.py
