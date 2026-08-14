import sys
import json
import re
from difflib import SequenceMatcher

def calculate_relevance(query: str, product: dict) -> float:
    query = query.lower().strip()
    if not query:
        return 1.0

    name = product.get("name", "").lower()
    category = product.get("category", "").lower()
    description = product.get("description", "").lower()
    features = " ".join(product.get("features", [])).lower()

    score = 0.0

    # Exact or substring match in name (highest weight)
    if query in name:
        score += 10.0
    
    # Exact or substring match in category
    if query in category:
        score += 5.0

    # Match in description / features
    if query in description:
        score += 3.0
    if query in features:
        score += 2.0

    # Fuzzy similarity on name tokens
    query_words = re.findall(r'\w+', query)
    name_words = re.findall(r'\w+', name)
    
    for q_word in query_words:
        for n_word in name_words:
            ratio = SequenceMatcher(None, q_word, n_word).ratio()
            if ratio > 0.7:
                score += ratio * 4.0

    return round(score, 2)


def search_products(query: str, products: list) -> dict:
    scored_products = []
    category_counts = {}

    for prod in products:
        score = calculate_relevance(query, prod)
        if query and score <= 0.5:
            continue
        
        prod_with_score = dict(prod)
        prod_with_score["_relevance_score"] = score
        scored_products.append(prod_with_score)

        cat = prod.get("category", "Other")
        category_counts[cat] = category_counts.get(cat, 0) + 1

    scored_products.sort(key=lambda x: x.get("_relevance_score", 0), reverse=True)

    return {
        "query": query,
        "total_results": len(scored_products),
        "category_distribution": category_counts,
        "results": scored_products
    }

if __name__ == "__main__":
    try:
        input_data = sys.stdin.read()
        if input_data:
            payload = json.loads(input_data)
            query = payload.get("query", "")
            products = payload.get("products", [])
            output = search_products(query, products)
            print(json.dumps(output))
        else:
            print(json.dumps({"error": "No input provided"}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
