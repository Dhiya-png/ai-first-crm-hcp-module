from fastapi import APIRouter
from app.agents.hcp_agent import agent
from datetime import date

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


@router.post("/")
def chat(message: str):

    response = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": message
                }
            ]
        }
    )

    messages = response["messages"]

    ai_message = messages[-1].content

    interaction = {
        "doctor_name": "",
        "discussion": "",
        "products": "",
        "interaction_date": ""
    }

    for msg in messages:
        if hasattr(msg, "tool_calls") and msg.tool_calls:
            for tool_call in msg.tool_calls:

                args = tool_call.get("args", {})

                if args.get("doctor_name"):
                    interaction["doctor_name"] = args["doctor_name"]

                if args.get("discussion"):
                    interaction["discussion"] = args["discussion"]

                if args.get("products"):
                    interaction["products"] = args["products"]

                if args.get("interaction_date"):

                    interaction_date = args["interaction_date"]

                    if interaction_date.lower() == "today":
                        interaction_date = date.today().isoformat()

                    interaction["interaction_date"] = interaction_date

    if not any(interaction.values()):
        interaction = None

    return {
        "response": ai_message,
        "interaction": interaction
    }