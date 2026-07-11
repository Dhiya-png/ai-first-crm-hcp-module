from langchain.tools import tool


@tool
def log_interaction(
    doctor_name: str,
    discussion: str,
    products: str
):
    """
    Log interaction with HCP.
    """
    return {
        "doctor_name": doctor_name,
        "discussion": discussion,
        "products": products,
        "status": "Interaction logged"
    }