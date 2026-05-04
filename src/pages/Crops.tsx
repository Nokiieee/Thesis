import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const cropData: Record<string, any> = {
  eggplant: {
    title: "Eggplant",
    steps: [
      "Eggplant (Solanum melongena esculentum) is rich in potassium, iron, protein, and vitamins A and B. Its skin contains nasunin, an antioxidant that helps protect cells.",
      "It grows best in sandy loam or clay loam soil at a temperature of 21 to 30°C.",
      "Plow and harrow the field 2 to 3 times, digging 15 to 20 cm deep to allow proper root development.",
      "About 100 grams of seeds are needed per hectare. Start seeds in a seedbed or seedling trays.",
      "For trays, mix compost, carbonized rice hull, and sterilized garden soil. Sterilize garden soil using heat or boiling water.",
      "Soak seeds in water overnight, then plant one seed per hole.",
      "Provide a shade structure about 120 cm high on the east side and 60 cm on the west to protect young seedlings.",
      "Ten days after germination, apply a starter fertilizer solution such as urea or ammonium sulfate.",
      "One week before transplanting, harden seedlings by exposing them to more sunlight and reducing water.",
      "Set plants in furrows or raised beds. Plastic mulch may be used with the silver side facing up to control weeds and retain moisture.",
      "Mix chicken manure and complete fertilizers into the soil before transplanting. Transplant seedlings at 30 to 35 days old with 3 to 4 true leaves.",
      "Transplant late in the afternoon to reduce stress. If plastic mulch is used, water beds two days before planting to cool the soil.",
      "During the dry season, water at 7, 21, and 30 days after transplanting, then every 10 days afterward.",
      "Remove lower lateral branches below the main stem split to improve air circulation and reduce disease.",
      "Harvesting starts 46 to 50 days after transplanting. Pick fruits twice a week in the early morning using pruning shears.",
      "Pack eggplants in plastic bags with two small pin holes per kilogram to allow airflow and keep them fresh.",
    ],
  },
  ampalaya: {
    title: "Ampalaya",
    steps: [
      "Ampalaya (bitter gourd) is a healthy climbing vine rich in vitamins and known for helping regulate blood sugar.",
      "It grows best in sandy or clay loam soil with a pH of 6 to 6.7. It can be planted year-round, but October to February is ideal.",
      "Plow and harrow the soil twice with a 7-day interval to make it soft and suitable for planting.",
      "Construct a trellis made of bamboo or wood to support upward growth.",
      "Clip the tips of the seeds, then soak for 24 hours and wrap in a damp cloth until they sprout.",
      "Plant one seed per hill with a spacing of 30 to 50 cm, or start seeds in trays and transplant after 15 days.",
      "Apply organic fertilizer before planting, followed by complete fertilizer and urea as the plants grow.",
      "Water plants as needed while avoiding flooding. Remove weeds and maintain proper drainage.",
      "Trim lower leaves and excess vines, keeping 1 to 2 main stems for better growth.",
      "Keep the area clean to prevent pests such as fruit flies and diseases.",
      "Harvest fruits 18 to 20 days after flowering while still young and firm.",
      "Sort and pack fresh ampalaya properly for the market.",
    ],
  },
  okra: {
    title: "Okra",
    steps: [
      "Okra is a vegetable crop known for its edible green pods. It is rich in nutrients and commonly used in many dishes.",
      "Okra grows best in a warm, sunny climate with a long growing season. It prefers soft, sandy soil that drains water well.",
      "Plow and harrow the field 2 to 3 times with a one-week interval between each. Till the soil about 15 to 20 cm deep.",
      "One day before planting, make furrows in straight rows with a spacing of 75 cm between lines.",
      "Apply complete fertilizer and organic fertilizer into the furrows and lightly cover with soil before planting.",
      "About 30 days after planting, apply urea to support plant growth.",
      "Soak seeds in water overnight to improve germination before planting.",
      "Plant 2 to 3 seeds per hole, spaced 30 cm apart. Replant missing plants after 3 days if needed.",
      "Water every 7 to 14 days. At 15 days old, remove weak seedlings, leaving only the strongest two per hill.",
      "At 15 days, do off-barring by gently cultivating soil away from the plants. After one month, hill up by pushing soil back to support the base.",
      "Remove weeds manually to prevent competition for nutrients and water.",
      "Monitor for pests like stink bugs and diseases. Remove and bury infected plants and keep the field clean.",
      "Okra starts flowering after 40 to 75 days. Fruits are ready for harvest 4 to 6 days after flowering.",
      "Harvest in the morning or late afternoon when pods are 3 to 4 inches long.",
      "Select good pods and pack in baskets or boxes lined with banana leaves or paper to avoid bruising.",
      "After harvest, cut the main stem about one foot above the ground, then fertilize and water. New shoots will grow for another round of production.",
    ],
  },
  patola: {
    title: "Patola",
    steps: [
      "Patola (luffa gourd) is a vegetable eaten when young. When dried, it becomes a natural loofah.",
      "It grows best in warm, humid climates with rich soil and good drainage.",
      "Plow and harrow the soil 2 to 3 times to make it soft. Make wide furrows about 2.5 to 3 meters apart.",
      "Build a strong overhead trellis to support proper growth since patola is a climbing vine.",
      "Soak seeds overnight before planting.",
      "Plant 1 to 2 seeds per hill during the dry season, or 2 to 3 seeds on ridges during the wet season.",
      "After a few weeks, remove weaker plants and keep the strongest one. Guide vines to climb the trellis.",
      "Apply compost and fertilizer to provide the necessary nutrients.",
      "Water plants regularly, about once a week, to keep the soil moist.",
      "Cut weeds carefully without disturbing the roots, as patola roots are sensitive.",
      "Monitor for pests such as fruit flies and diseases like downy mildew.",
      "Harvest fruits a few days after they form using a sharp knife.",
      "Pack fresh patola carefully to maintain good condition for the market.",
    ],
  },
  sitaw: {
    title: "Sitaw",
    steps: [
      "Sitaw is a fast-growing vegetable legume. It is rich in protein and helps improve the soil by adding nitrogen.",
      "It can grow all year round and prefers a temperature of 20 to 35°C with well-drained soil.",
      "Plow the soil deeply and harrow 2 to 3 times. Make furrows with proper spacing depending on the type of sitaw.",
      "Mix organic compost and complete fertilizer into the soil before planting.",
      "Plant seeds using the drill or hill method and cover with soil. During the rainy season, plant on raised ridges.",
      "Water plants when needed, especially when they begin to wilt.",
      "Set up a trellis early so the vines can climb properly (for pole type).",
      "Remove weaker plants early and control weeds to support healthy growth.",
      "Add soil around the base of the plants to support their growth (hilling-up).",
      "Monitor plants for pests and diseases, especially during early growth stages.",
      "Harvest young pods regularly while they are still green and tender.",
      "For seed production, allow pods to turn brown, then dry and store them properly.",
    ],
  },
  squash: {
    title: "Squash",
    steps: [
      "Squash (kalabasa) is rich in vitamins and antioxidants that support overall health.",
      "It grows best in a warm, dry climate with well-drained sandy loam soil. Plant from October to December in lowlands, or May to July in highlands.",
      "Plow and harrow the soil 2 to 3 times. Create furrows and drainage canals during the rainy season to prevent flooding.",
      "Plant pre-germinated seeds directly into the soil, one per hill, with proper spacing. During the wet season, plant on raised areas to avoid rotting.",
      "Alternatively, grow seedlings in pots and transplant after 15 days, preferably in the late afternoon.",
      "Mix organic manure into the soil before planting. Add urea when vines start to grow, followed by potash and solophos after two weeks.",
      "Water plants regularly, but reduce or stop watering when fruits reach the mature green stage to improve taste.",
      "Remove weeds early. If necessary, hand-pollinate flowers in the morning.",
      "Remove damaged fruits and place straw underneath healthy fruits to prevent rotting.",
      "Protect plants from pests such as aphids, beetles, and viruses.",
      "Harvest squash 30 to 40 days after pollination using a sharp knife.",
      "For seed production, allow squash to fully mature until it develops a hard rind and orange color.",
    ],
  },
  upo: {
    title: "Upo",
    steps: [
      "Upo (bottle gourd) is a versatile plant. Its fruits, shoots, and seeds can be eaten, and its dried shell can be used for tools and crafts.",
      "Plow and harrow the soil 2 to 3 times until it becomes soft and well-aerated.",
      "Soak seeds in water for 24 hours, then wrap in a moist cloth until they sprout.",
      "Plant seeds directly in the soil with about 1 meter spacing. During the rainy season, plant on raised ridges.",
      "Alternatively, grow seedlings in pots and transplant after 15 days, preferably in the afternoon.",
      "Build a strong trellis to support upward growth since upo is a climbing plant.",
      "Pinch the tips of the vines to encourage more branches and fruit production.",
      "Apply fertilizer during planting, followed by organic fertilizer, urea, and potash as the plant grows.",
      "Water regularly but not excessively. Ensure proper drainage and use mulch to maintain moisture.",
      "Hill up soil early and carefully remove weeds during fruiting without disturbing the roots.",
      "Protect plants from pests such as beetles and diseases. Avoid applying pesticide late in the day.",
      "Harvest fruits about 15 days after they form. Cut the stem carefully and pack fruits properly to keep them fresh.",
    ],
  },
  tomato: {
    title: "Tomato",
    steps: [
      "Tomatoes (Lycopersicum esculentum Miller) are a popular vegetable crop rich in Vitamin A, Vitamin C, and lycopene, an antioxidant that supports heart health.",
      "Tomatoes grow best in cool and dry conditions with an ideal temperature of 21 to 24°C. Off-season varieties planted from May to September can provide better market value.",
      "Plow and harrow the field 2 to 3 times, reaching a depth of 15 to 20 cm to create soft soil for better root development.",
      "Clean the seedbed to eliminate weeds and pests. Spread rice hull or straw (3 to 5 cm thick) and burn slowly to sterilize the soil. Plant only after the soil cools.",
      "Soak seeds in clean water overnight, then sow in shallow rows and lightly cover with fine soil.",
      "For the first 3 days, water frequently to ensure germination. Afterward, reduce watering. At 7 to 14 days, apply a starter fertilizer solution (urea mixed with water).",
      "Harden seedlings by gradually reducing water and exposing them to more sunlight before transplanting.",
      "Prepare raised beds and cover with plastic mulch with the silver side facing up to control weeds and maintain soil moisture.",
      "Space plants 0.5 meters apart. Cut holes in the plastic mulch in an 'X' shape. Transplant late in the afternoon to avoid heat stress.",
      "Install support sticks about 15 days after planting to help the plants grow upright.",
      "Remove excess side shoots to improve airflow and fruit development. Prune in the morning to allow faster healing.",
      "Avoid overwatering since tomatoes are sensitive to flooding. Maintain moist soil, especially during flowering.",
      "Harvesting starts 55 to 65 days after planting. For long-distance transport, pick at the Mature Green stage. For nearby markets, harvest at the Pink Breaker stage.",
      "Sort tomatoes by size, color, and quality. Remove damaged fruits, wash and gently wipe them.",
      "Pack good-quality tomatoes in strong boxes or baskets lined with newspaper or protective material to prevent damage during transport.",
    ],
  },
  "hot-pepper": {
    title: "Hot Pepper",
    steps: [
      "Hot peppers (Capsicum annuum L.) are nutritious crops rich in Vitamin C, provitamin A, and iron. Their leaves contain calcium, and the fruits have medicinal properties that may help relieve arthritis pain and reduce the risk of diabetes.",
      "They grow best in sunny environments. Plant from May to September (wet season) or October to February (dry season). They prefer sandy loam or clay loam soil.",
      "Plow and harrow the field 2 to 3 times until the soil becomes fine and loose. Make furrows 80 cm apart, or use a double-row system to protect fruits from sun scalding.",
      "About 100 grams of seeds are needed per hectare. Start seeds in a seedbed by burning rice straw to sterilize the soil, or use seedling trays.",
      "For trays, prepare medium by mixing 1 part compost, 1 part carbonized rice hull, and 1 part sterilized garden soil.",
      "Soak seeds in clean water overnight before sowing.",
      "Water seedlings in the morning to prevent damping-off. Thin after developing 2 pairs of true leaves. Apply starter fertilizer 10 days after germination.",
      "One week before transplanting, harden seedlings by reducing water and exposing them to direct sunlight.",
      "Transplant seedlings at 28 to 42 days old, spaced 30 cm apart. Transplant on cloudy days or late afternoon to reduce wilting.",
      "Apply complete fertilizer and ammonium phosphate as basal fertilizer. Add more fertilizer at 10, 30, and 50 days after transplanting. Avoid excess nitrogen.",
      "Water at transplanting, then at 14, 30, and 50 days after. Do off-barring at 10 days and hill-up at 30 days to control weeds and support growth.",
      "Monitor for pests such as aphids and spider mites, and diseases like bacterial wilt.",
      "Begin harvesting 60 to 75 days after transplanting when fruits are mature green, full-sized, and shiny.",
      "Harvest fruits by twisting the pedicel upward or cutting with a sharp knife.",
      "Remove damaged fruits and pack good-quality peppers in polyethylene plastic bags or boxes for storage and transport.",
    ],
  },
};

const Crops = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const crop = cropData[id ?? ""];

  if (!crop) {
    return (
      <div className="p-6">
        <h1>Crop not found</h1>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* BACK BUTTON */}
        <Button onClick={() => navigate(-1)}>← Back</Button>

        {/* STEP + HEADER (KEPT TOGETHER — DO NOT SPLIT) */}
        <Card className="overflow-hidden">
          {/* Header band inside the card */}
          <div className="px-6 py-5 border-b">
            <h1 className="text-3xl font-bold">{crop.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {crop.steps.length} steps to a successful harvest
            </p>
          </div>

          {/* Steps */}
          <div className="px-6 py-5 space-y-3">
            <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Step-by-step Guide
            </h2>

            {crop.steps.map((step: string, index: number) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold ring-1 ring-primary/20">
                    {index + 1}
                  </div>

                  {index < crop.steps.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1 min-h-[16px]" />
                  )}
                </div>

                <p className="text-sm leading-relaxed pb-3 pt-1 text-foreground/80 group-last:pb-0">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* BUTTONS ONLY (SEPARATE LIKE RESULT.TSX) */}
        <Card className="p-6 space-y-4">
          <Button
            className="w-full"
            style={{ backgroundColor: "#6aa357", color: "white" }}
            onClick={() => {
              const pdfUrl = `https://thesis-ljvg.onrender.com/pdfs/${id}.pdf`;

              // 🚀 instant open (no React route, no loading screen)
              window.location.href = pdfUrl;
            }}
          >
            View PDF Guide
          </Button>

          <Button
            className="w-full"
            style={{ backgroundColor: "#479941", color: "white" }}
            onClick={() => navigate(`/video/${id}`)}
          >
            Watch Video Tutorial
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Crops;
