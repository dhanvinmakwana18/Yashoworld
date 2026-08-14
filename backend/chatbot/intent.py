def determine_intent(message: str) -> str:
    msg_lower = message.lower()
    if "price" in msg_lower or "cost" in msg_lower:
        return "pricing"
    if "order" in msg_lower or "buy" in msg_lower:
        return "ordering"
    if "flower" in msg_lower or "preservation" in msg_lower:
        return "flower_preservation"
    return "general_faq"