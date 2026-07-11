from langchain.tools import tool


@tool
def search_hcp(
    doctor_name: str
):
    """
    Search doctor information.
    """

    return {
        "doctor_name": doctor_name,
        "status": "Found"
    }