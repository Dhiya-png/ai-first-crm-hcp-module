from langchain.tools import tool

@tool
def add_note(note: str):
    """
    Add additional notes for an interaction.
    """
    return f"Note added: {note}"