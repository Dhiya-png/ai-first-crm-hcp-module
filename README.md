# 🩺 AI-Powered HCP CRM

An AI-assisted Healthcare Professional (HCP) Customer Relationship Management (CRM) system that enables medical representatives to record doctor interactions using natural language. The AI extracts structured information from conversations and automatically fills the CRM form, making interaction logging faster and more efficient.

---

## 🚀 Features

- 🤖 AI-powered interaction extraction
- 📝 Automatic form filling from natural language
- 👨‍⚕️ HCP (Doctor) Management
- 💬 AI Chat Assistant
- 📋 CRUD operations for interactions
- ✏️ Edit and update interactions
- 🗑️ Delete interactions
- 📅 Interaction date management
- 📦 Product discussion tracking
- ⚡ FastAPI backend
- ⚛️ React frontend
- 🧠 LangGraph AI Agent
- 🗄️ PostgreSQL database

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Axios
- React Markdown
- CSS

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- LangGraph
- LangChain
- OpenAI

---

## 📂 Project Structure

```
AI-HCP-CRM/
│
├── backend/
│   ├── app/
│   ├── routers/
│   ├── models/
│   ├── schemas/
│   ├── agents/
│   ├── database.py
│   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── store/
│   │   ├── assets/
│   │   └── App.jsx
│
├── README.md
└── requirements.txt
```

---

# ✨ AI Workflow

1. User enters interaction in natural language.
2. AI extracts:
   - Doctor Name
   - Discussion
   - Products
   - Date
3. Structured form is automatically filled.
4. User reviews or edits the extracted information.
5. Interaction is saved to the database.

---

# 📸 Screenshots

Add screenshots here.

Example:

```
screenshots/
    dashboard.png
    ai-chat.png
```

Then use

```md
![Dashboard](screenshots/dashboard.png)
```

---

# ⚙️ Installation

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# API Endpoints

## HCP

| Method | Endpoint |
|---------|----------|
| GET | /hcp |
| POST | /hcp |
| GET | /hcp/{id} |
| PUT | /hcp/{id} |
| DELETE | /hcp/{id} |

---

## Interactions

| Method | Endpoint |
|---------|----------|
| GET | /interactions |
| POST | /interactions |
| PUT | /interactions/{id} |
| DELETE | /interactions/{id} |

---

## AI Chat

| Method | Endpoint |
|---------|----------|
| POST | /chat |

---

# Future Improvements

- Conversation memory
- Authentication
- User login
- Dashboard analytics
- File upload
- Voice interaction
- AI meeting summaries

---

# Author

**Dhiya R**

Python Full Stack Developer

GitHub:
(Add your GitHub URL)

LinkedIn:
(Add your LinkedIn URL)

---