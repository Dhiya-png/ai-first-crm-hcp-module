from langchain.tools import tool

@tool
def suggest_followup(interaction: str):
    """
    Suggest next steps after an interaction.
    """
    return (
        f"Suggested follow-up for: {interaction}"
    )