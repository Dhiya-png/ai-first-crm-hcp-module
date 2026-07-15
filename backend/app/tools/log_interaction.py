from langchain.tools import tool
from datetime import date

@tool
def log_interaction(
    doctor_name: str,
    discussion: str,
    products: str = "",
):
    """
    Extract interaction details from the user's natural language.
    This tool prepares structured interaction data for the CRM.
    """

    return {
        "doctor_name": doctor_name,
        "discussion": discussion,
        "products": products,
        "interaction_date": str(date.today()),
        "summary": f"Discussion with {doctor_name} regarding {products}.",
        "status": "Interaction extracted successfully"
    }