from chatbot.intent import determine_intent
from chatbot.responses import generate_response

async def process_message(message: str, session_id: str):
    intent = determine_intent(message)
    reply = generate_response(intent, message)
    return {"reply": reply, "intent": intent}