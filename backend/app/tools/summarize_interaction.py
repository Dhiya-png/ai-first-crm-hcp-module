from langchain.tools import tool

@tool
def summarize_interaction(text: str):
    """
    Summarize an interaction.
    """
    return (
        f"Summary generated for: {text}"
    )