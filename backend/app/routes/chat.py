from fastapi import APIRouter
from app.agents.hcp_agent import llm

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)

@router.post("/")
def chat(message: str):
    response = llm.invoke(
        f"""
        You are an AI CRM assistant.

        User message:
        {message}

        Summarize the interaction and suggest a follow up.
        """
    )

    return {
        "response": response.content
    }