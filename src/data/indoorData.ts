// src/data/indoorData.ts

export type IndoorItem = {
  title: {
    en: string;
    tl: string;
  };

  steps: {
    en: string[];
    tl: string[];
  };
};

export const indoorData: Record<string, IndoorItem> = {
  hydroponics: {
    title: {
      en: "Hydroponics",
      tl: "Hydroponics",
    },

    steps: {
      en: [
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

      tl: [
        "Ang hydroponics ay isang paraan ng pagtatanim ng lettuce na hindi gumagamit ng lupa, kundi gumagamit ng tubig na may halong sustansya.",
        "Maghanda ng reservoir tank na paglalagyan ng tubig at nutrients.",
        "Mag-install ng mga PVC pipes o grow channels para sa tamang pwesto ng mga halaman.",
        "Maglagay ng net cups upang suportahan ang mga punla ng lettuce.",
        "Haluin ang tubig at hydroponic nutrient solution.",
        "Gumamit ng water pump upang paikutin ang solusyon.",
        "Siguraduhing ang mga ugat ay palaging nalalantad sa daloy ng nutrients.",
        "Tiyaking nasa pagitan ng 5.5 hanggang 6.5 ang pH level para sa pinakamainam na paglaki.",
        "Magbigay ng sapat na ilaw o sikat ng araw.",
        "Bantayan araw-araw ang antas ng tubig at konsentrasyon ng nutrients.",
        "Linisin ang sistema nang regular upang maiwasan ang pagdami ng algae.",
        "Anihin ang lettuce pagkatapos ng 30–45 araw kapag ganap nang lumaki ang mga dahon.",
      ],
    },
  },

  aquaponics: {
    title: {
      en: "Aquaponics",
      tl: "Aquaponics",
    },

    steps: {
      en: [
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

      tl: [
        "Ang aquaponics ay isang sistema na pinagsasama ang pag-aalaga ng isda (tilapia) at pagtatanim ng lettuce sa iisang sistema.",
        "Maghanda ng fish tank para sa tilapia.",
        "Gumawa ng grow bed na puno ng graba o clay pebbles.",
        "Mag-install ng water pump at piping system.",
        "I-ugnay ang fish tank at grow bed upang magkaroon ng sirkulasyon ng tubig.",
        "Dahan-dahang ilagay ang mga tilapia sa tangke.",
        "Itanim ang mga punla ng lettuce sa grow bed.",
        "Ang mga benepisyong bakterya ay nagko-convert ng dumi ng isda bilang sustansya para sa mga halaman.",
        "Panatilihin ang pH ng tubig sa pagitan ng 6.0 hanggang 7.0.",
        "Pakainin ang mga isda araw-araw at bantayan ang daloy ng sistema.",
        "Linisin ang water pump at alisin ang naipong dumi nang regular.",
        "Anihin ang lettuce sa loob ng 30–45 araw at ang tilapia sa loob ng 4–6 na buwan.",
      ],
    },
  },

  aeroponics: {
    title: {
      en: "Aeroponics",
      tl: "Aeroponics",
    },

    steps: {
      en: [
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

      tl: [
        "Ang aeroponics ay isang paraan ng pagtatanim ng lettuce kung saan ang mga ugat ay nakabitin sa hangin at binubugahan ng ambon na may nutrients.",
        "Gumawa ng vertical na PVC grow chambers.",
        "Mag-drill ng mga butas para sa paglalagay ng net cups.",
        "Mag-install ng internal misting pipes na may spray nozzles.",
        "Ikonekta ang sistema sa nutrient reservoir.",
        "Mag-install ng water pump para sa sirkulasyon ng ambon.",
        "Ihanda ang nutrient solution sa reservoir tank.",
        "Ilagay ang mga punla ng lettuce na nakalantad ang mga ugat.",
        "Ipatakbo ang misting cycle sa regular na pagitan.",
        "Tiyaking natatanggap ng mga ugat ang pinong ambon ng nutrients.",
        "Bantayan kung may tagas at ang pressure ng sistema.",
        "Linisin ang sistema at regular na palitan ang nutrient solution.",
        "Anihin ang lettuce sa loob ng 30–45 araw.",
      ],
    },
  },
};

export default indoorData;
