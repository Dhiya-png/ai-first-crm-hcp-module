from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent

from app.tools.log_interaction import log_interaction
from app.tools.edit_interaction import edit_interaction
from app.tools.search_hcp import search_hcp
from app.tools.summarize_interaction import summarize_interaction
from app.tools.followup_tool import follow_up

from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY")
)

tools = [
    log_interaction,
    edit_interaction,
    search_hcp,
    summarize_interaction,
    follow_up
]

agent = create_react_agent(
    llm,
    tools,
    prompt="""
You are an AI assistant for a Healthcare CRM system.

Available tools:
- log_interaction
- edit_interaction
- search_hcp
- summarize_interaction
- follow_up

Never use any tool other than the above.
Never invent tool names like add_note.
"""
)