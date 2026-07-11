from langchain.tools import tool


@tool
def follow_up(
    doctor_name: str,
    follow_up_date: str
):
    """
    Schedule follow-up.
    """

    return {
        "doctor_name": doctor_name,
        "follow_up_date": follow_up_date,
        "status": "Follow-up scheduled"
    }