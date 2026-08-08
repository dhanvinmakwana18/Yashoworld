from chatbot.faq import get_faq_answer
from chatbot.recommendations import get_recommendation

def generate_response(intent: str, message: str) -> str:
    if intent == "pricing":
        return "Our custom resin pieces start at ₹850 and vary based on size and customization."
    elif intent == "flower_preservation":
        return "We carefully dry your real flowers using silica gel, then cast them in multiple layers of UV-resistant crystal resin to preserve them forever."
    elif intent == "ordering":
        return "I can help you place an order! Could you share what kind of resin art you are looking for?"
    else:
        return get_faq_answer(message)