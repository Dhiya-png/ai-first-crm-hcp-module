from langchain.tools import tool

@tool
def follow_up(
    doctor_name: str,
    follow_up_date: str,
    reason: str = ""
):
    """
    Schedule a follow-up meeting with an HCP.
    """

    return {
        "doctor_name": doctor_name,
        "follow_up_date": follow_up_date,
        "reason": reason,
        "status": "Follow-up scheduled successfully",
        "message": f"Follow-up scheduled with {doctor_name} on {follow_up_date}."
    }