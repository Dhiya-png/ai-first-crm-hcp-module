from langchain.tools import tool


@tool
def edit_interaction(
    interaction_id: int,
    new_summary: str
):
    """
    Edit interaction details.
    """

    return {
        "interaction_id": interaction_id,
        "summary": new_summary,
        "status": "Updated"
    }