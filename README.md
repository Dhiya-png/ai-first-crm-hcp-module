# AI-First CRM for Healthcare Provider (HCP) Interactions

## Project Overview

AI-First CRM is a Healthcare Provider (HCP) interaction management system that allows medical representatives to:

- Log doctor interactions
- Store discussion details
- Track products discussed
- Generate AI-powered summaries
- Get follow-up suggestions
- Manage interaction history

The system uses FastAPI for the backend, React for the frontend, PostgreSQL for the database, and LangChain + Groq LLM for AI capabilities.

---

# Features

## 1. Log HCP Interactions
- Store doctor interactions.
- Save products discussed.
- Save interaction date.
- Maintain complete interaction history.

## 2. AI Chat Assistant
- Accepts natural language interaction notes.
- Generates structured summaries.
- Provides follow-up recommendations.

Example:

Input:

```text
I met Dr. Sarah today and discussed DermaCare Cream. She requested more samples next week.
```

Output:

- Interaction Summary
- Follow-up Suggestions
- Next Action Items

---

## 3. Interaction Management

Users can:

- Create interactions
- View interactions
- Edit interactions
- Delete interactions

---

## 4. AI Tools

The AI Agent can:

- Search HCP information
- Summarize interactions
- Suggest follow-up actions
- Edit interaction summaries
- Log interaction details

---

# Tech Stack

## Frontend

- React.js
- Axios
- Redux Toolkit
- React Markdown
- CSS

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- LangChain
- LangGraph
- Groq API

## Database

- PostgreSQL

---

# Project Structure

## Backend

```text
backend/
│
├── app/
│   ├── agents/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── tools/
│   ├── database.py
│   └── main.py
│
├── requirements.txt
└── .env
```

## Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
```

---

# Database Schema

## HCP Table

| Column | Type |
|--------|-------|
| id | Integer |
| name | String |
| specialization | String |
| hospital | String |

---

## Interaction Table

| Column | Type |
|--------|-------|
| id | Integer |
| hcp_id | Integer |
| interaction_date | Date |
| discussion | Text |
| products | String |
| summary | Text |
| follow_up_date | Date |

---

# API Endpoints

## HCP APIs

### Create HCP

```http
POST /hcps/
```

### Get HCPs

```http
GET /hcps/
```

---

## Interaction APIs

### Create Interaction

```http
POST /interactions/
```

### Get All Interactions

```http
GET /interactions/
```

### Update Interaction

```http
PUT /interactions/{id}
```

### Delete Interaction

```http
DELETE /interactions/{id}
```

---

## AI Chat API

```http
POST /chat/?message=
```

Example:

```text
I met Dr. Sarah today and discussed HeartCare Plus.
```

---

# Installation

## Backend Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

### Install Packages

```bash
npm install
```

### Run Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside backend:

```env
DATABASE_URL=postgresql://username:password@localhost/hcp_crm
GROQ_API_KEY=your_groq_api_key
```

---

# AI Workflow

1. User enters interaction notes.
2. React sends request to FastAPI.
3. FastAPI calls LangChain Agent.
4. Agent uses Groq LLM.
5. AI generates:
   - Summary
   - Follow-up suggestions
   - Action items
6. Response is displayed in the frontend.

---

# Future Enhancements

- Doctor search dropdown
- Authentication and login
- Dashboard and analytics
- Email reminders
- Follow-up notifications
- Popup edit forms
- File upload support

---

# Author

**Dhiya Radhakrishnan**

Python Full Stack Developer

Skills:
- Python
- Django
- FastAPI
- React.js
- PostgreSQL
- LangChain
- REST APIs
- AI Integrations

---

# Conclusion

AI-First CRM for HCP Interactions simplifies doctor interaction management by combining traditional CRM functionality with AI-powered summarization and follow-up recommendations, helping medical representatives maintain better relationships with healthcare providers.