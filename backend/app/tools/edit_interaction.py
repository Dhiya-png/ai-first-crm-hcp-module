from langchain.tools import tool

@tool
def edit_interaction(
    interaction_id: int,
    doctor_name: str = "",
    discussion: str = "",
    products: str = "",
    summary: str = "",
):
    """
    Update specific fields of an existing HCP interaction.
    Only the fields provided by the user should be modified.
    """

    updated_fields = {}

    if doctor_name:
        updated_fields["doctor_name"] = doctor_name

    if discussion:
        updated_fields["discussion"] = discussion

    if products:
        updated_fields["products"] = products

    if summary:
        updated_fields["summary"] = summary

    return {
        "interaction_id": interaction_id,
        "updated_fields": updated_fields,
        "status": "Interaction updated successfully"
    }