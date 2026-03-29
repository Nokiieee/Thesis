import { QuestionnaireData } from "@/pages/Questionnaire";

export type FarmingMethod = {
  type: "indoor" | "outdoor";
  method: string;
  description: string;
  videoId: string;
};

// Rule-based recommendation system mimicking XGBoost decision logic
export const getFarmingRecommendation = (data: QuestionnaireData): FarmingMethod => {
  const { landArea, waterSource, sunlight, budget, experience } = data;

  // Indoor farming conditions
  if (
    (landArea === "small" && budget === "high") ||
    (sunlight === "low" && budget !== "low") ||
    (waterSource === "high" && budget === "high")
  ) {
    // Choose between indoor methods based on experience and budget
    if (experience === "beginner") {
      return {
        type: "indoor",
        method: "Hydroponics",
        description: "Soil-free farming perfect for beginners with controlled environments. Grow plants in nutrient-rich water solutions.",
        videoId: "hydroponics"
      };
    } else if (budget === "high" && experience === "expert") {
      return {
        type: "indoor",
        method: "Aeroponics",
        description: "Advanced method where plant roots are suspended in air and misted with nutrients. Requires expertise but offers highest yields.",
        videoId: "aeroponics"
      };
    } else {
      return {
        type: "indoor",
        method: "Aquaponics",
        description: "Combines fish farming with plant cultivation. Fish waste provides nutrients for plants in a sustainable ecosystem.",
        videoId: "aquaponics"
      };
    }
  }

  // Outdoor farming - select crop based on conditions
  const crops = [
    { name: "Upo (Bottle Gourd)", conditions: { water: "high", sun: "full" }, id: "upo" },
    { name: "Ampalaya (Bitter Gourd)", conditions: { water: "medium", sun: "full" }, id: "ampalaya" },
    { name: "Patola (Sponge Gourd)", conditions: { water: "high", sun: "full" }, id: "patola" },
    { name: "Eggplant", conditions: { water: "medium", sun: "full" }, id: "eggplant" },
    { name: "Sitaw (String Beans)", conditions: { water: "medium", sun: "full" }, id: "sitaw" },
    { name: "Tomato", conditions: { water: "medium", sun: "full" }, id: "tomato" },
    { name: "Squash", conditions: { water: "high", sun: "full" }, id: "squash" },
    { name: "Hot Pepper", conditions: { water: "low", sun: "full" }, id: "hot-pepper" },
    { name: "Okra", conditions: { water: "medium", sun: "full" }, id: "okra" },
  ];

  // Match crop to conditions
  let selectedCrop = crops.find(crop => 
    crop.conditions.water === waterSource && crop.conditions.sun === sunlight
  );

  // Fallback to most forgiving crop if no exact match
  if (!selectedCrop) {
    selectedCrop = sunlight === "full" && waterSource === "medium" 
      ? crops.find(c => c.id === "tomato")
      : crops.find(c => c.id === "okra");
  }

  return {
    type: "outdoor",
    method: `${selectedCrop?.name || "Tomato"}`,
    description: `Perfect for your outdoor conditions. This lowland crop thrives with your available resources and experience level.`,
    videoId: selectedCrop?.id || "tomato"
  };
};