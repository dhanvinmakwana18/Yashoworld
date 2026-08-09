import sys
import json
import math

SHAPE_FACTORS = {
    "Rectangle": 1.0,
    "Square": 1.0,
    "Circle": math.pi / 4.0,  # (pi * d^2)/4 relative to square w^2
    "Hexagon": 0.866,
    "Arch": 0.85,
    "Heart": 0.78
}

def calculate_resin_requirements(length_cm: float, width_cm: float, depth_cm: float, shape: str = "Rectangle", gold_foil_type: str = "Subtle") -> dict:
    # Volume in cubic centimeters (cm^3) = ml
    shape_factor = SHAPE_FACTORS.get(shape, 1.0)
    raw_volume_cm3 = length_cm * width_cm * depth_cm * shape_factor
    
    # Adding 5% buffer for mixing vessel loss
    total_volume_ml = math.ceil(raw_volume_cm3 * 1.05)
    
    # Resin density ~1.12 g/ml
    total_weight_grams = math.ceil(total_volume_ml * 1.12)
    
    # 2:1 ratio by weight (Part A : Part B)
    part_a_resin_grams = math.ceil((2.0 / 3.0) * total_weight_grams)
    part_b_hardener_grams = total_weight_grams - part_a_resin_grams

    # Gold foil estimation
    foil_grams_map = {
        "None": 0.0,
        "Subtle": round(total_volume_ml * 0.005, 2),
        "Full Golden Leaf Flakes": round(total_volume_ml * 0.015, 2),
        "Rose Gold Accent": round(total_volume_ml * 0.008, 2)
    }
    gold_foil_grams = foil_grams_map.get(gold_foil_type, 0.2)

    # Curing time estimation (assuming room temp 25°C)
    # Thicker layers require slow cure deep pour resin (24-48 hours)
    if depth_cm > 2.0:
        curing_hours = 48
        resin_type = "Deep Pour UV-Resistant Casting Epoxy"
    else:
        curing_hours = 24
        resin_type = "High-Gloss Crystal Coating Epoxy"

    # Cost calculation (INR estimates)
    # Resin cost ~ ₹2.5 per gram, Gold foil ~ ₹50 per gram, Artisanal Labor
    base_material_cost = math.ceil((total_weight_grams * 2.5) + (gold_foil_grams * 50.0))
    crafting_labor_cost = math.ceil(base_material_cost * 0.8)
    estimated_retail_price = math.ceil((base_material_cost + crafting_labor_cost) * 1.3)

    return {
        "dimensions": {
            "length_cm": length_cm,
            "width_cm": width_cm,
            "depth_cm": depth_cm,
            "shape": shape
        },
        "volume_ml": total_volume_ml,
        "total_weight_grams": total_weight_grams,
        "part_a_resin_grams": part_a_resin_grams,
        "part_b_hardener_grams": part_b_hardener_grams,
        "gold_foil_grams": gold_foil_grams,
        "resin_type_recommended": resin_type,
        "curing_duration_hours": curing_hours,
        "cost_breakdown": {
            "material_cost_inr": base_material_cost,
            "crafting_labor_inr": crafting_labor_cost,
            "suggested_price_inr": estimated_retail_price
        }
    }

if __name__ == "__main__":
    try:
        input_data = sys.stdin.read()
        if input_data:
            payload = json.loads(input_data)
            length = float(payload.get("length_cm", 15.0))
            width = float(payload.get("width_cm", 15.0))
            depth = float(payload.get("depth_cm", 1.5))
            shape = payload.get("shape", "Rectangle")
            gold_foil = payload.get("gold_foil", "Subtle")
            
            result = calculate_resin_requirements(length, width, depth, shape, gold_foil)
            print(json.dumps(result))
        else:
            print(json.dumps({"error": "No input payload"}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
