// src/data/indoorData.ts

export const indoorData: Record<
  string,
  {
    title: string;
    steps: string[];
  }
> = {
  hydroponics: {
    title: "Hydroponics",
    steps: [
      "Hydroponics is a method of growing lettuce without soil using nutrient-rich water.",
      "Prepare a reservoir tank to store water and nutrients.",
      "Install PVC pipes or grow channels for plant placement.",
      "Place net cups to hold lettuce seedlings.",
      "Mix water with hydroponic nutrient solution.",
      "Use a water pump to circulate the solution.",
      "Ensure roots are constantly exposed to nutrient flow.",
      "Check pH level between 5.5 and 6.5 for best growth.",
      "Provide proper lighting or sunlight exposure.",
      "Monitor water level and nutrient concentration daily.",
      "Clean system regularly to avoid algae buildup.",
      "Harvest lettuce after 30–45 days when leaves are fully grown.",
    ],
  },

  aquaponics: {
    title: "Aquaponics",
    steps: [
      "Aquaponics combines fish farming (tilapia) and lettuce growing in one system.",
      "Set up a fish tank for tilapia.",
      "Build a grow bed filled with gravel or clay pebbles.",
      "Install a water pump and piping system.",
      "Connect fish tank and grow bed for water circulation.",
      "Add tilapia carefully into the tank.",
      "Plant lettuce seedlings in the grow bed.",
      "Beneficial bacteria convert fish waste into nutrients.",
      "Maintain water pH between 6.0 and 7.0.",
      "Feed fish daily and monitor system flow.",
      "Clean water pump and remove waste buildup regularly.",
      "Harvest lettuce in 30–45 days and tilapia in 4–6 months.",
    ],
  },

  aeroponics: {
    title: "Aeroponics",
    steps: [
      "Aeroponics grows lettuce with roots suspended in air and misted with nutrients.",
      "Build vertical PVC grow chambers.",
      "Drill holes for net cups placement.",
      "Install internal misting pipes with spray nozzles.",
      "Connect system to a nutrient reservoir.",
      "Install a water pump for mist circulation.",
      "Prepare nutrient solution in reservoir tank.",
      "Place lettuce seedlings with exposed roots.",
      "Run misting cycle at regular intervals.",
      "Ensure roots receive fine nutrient mist.",
      "Check for leaks and system pressure.",
      "Clean system and replace nutrient solution regularly.",
      "Harvest lettuce in 30–45 days.",
    ],
  },
};
