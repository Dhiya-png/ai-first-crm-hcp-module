from langchain.tools import tool

@tool
def summarize_interaction(
    doctor_name: str,
    discussion: str,
    products: str = "",
):
    """
    Generate a concise summary of an HCP interaction.
    """

    summary = (
        f"Met with {doctor_name}. "
        f"Discussed {discussion}. "
        f"Products discussed: {products}."
    )

    return {
        "doctor_name": doctor_name,
        "summary": summary,
        "status": "Summary generated successfully"
    }