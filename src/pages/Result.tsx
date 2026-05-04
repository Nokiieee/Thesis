import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

type BackendResponse = {
  recommendation: string;
  description: string;
  type: "indoor" | "outdoor";
  video_id: string;
};

const BASE_URL = "https://thesis-ljvg.onrender.com";

const logoPath = (name: string) =>
  `/logos/${name.toLowerCase().replace(/\s+/g, "-")}.png`;

const pdfPath = (name: string) =>
  `${BASE_URL}/pdfs/${name.toLowerCase().replace(/\s+/g, "-")}.pdf`;

/* -------------------------
   🧠 INDOOR STEP DATA
--------------------------*/
const indoorData: Record<string, { title: string; steps: string[] }> = {
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
      "Clean filters and remove waste buildup regularly.",
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

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [recommendation, setRecommendation] = useState<BackendResponse | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = location.state;

    if (!data) {
      navigate("/");
      return;
    }

    const fetchPrediction = async () => {
      try {
        const url =
          data.type === "outdoor"
            ? `${BASE_URL}/predict-outdoor`
            : `${BASE_URL}/predict-indoor`;

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json?.detail || "Backend error");

        setRecommendation(json);
      } catch (err) {
        alert("Failed to load recommendation from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [location.state, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner loading={true} />
      </div>
    );
  }

  if (!recommendation) return null;

  const id = recommendation.recommendation.toLowerCase().replace(/\s+/g, "-");

  const crop = indoorData[id]; // 👈 MATCH INDOOR STEPS

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        {/* HEADER (UNCHANGED AS REQUESTED) */}
        <header className="py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Your Recommendation</h1>
        </header>

        <div className="space-y-6">
          {/* MAIN CARD (same style direction as Crops.tsx) */}
          <Card className="p-8 text-center">
            {/* ICON (KEPT) */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <img
                  src={logoPath(recommendation.recommendation)}
                  alt="Farming Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-3xl font-bold mb-2">
              {recommendation.recommendation}
            </h2>

            {/* TYPE */}
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Indoor Farming
            </div>

            {/* DESCRIPTION */}
            <p className="text-muted-foreground text-lg">
              {recommendation.description}
            </p>
          </Card>

          {/* STEP-BY-STEP (LIKE Crops.tsx) */}
          {crop && (
            <Card className="overflow-hidden p-6 space-y-4">
              <h2 className="text-base font-semibold uppercase text-muted-foreground">
                Step-by-step Guide
              </h2>

              {crop.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground/80">{step}</p>
                </div>
              ))}
            </Card>
          )}

          {/* ACTION BUTTONS */}
          <Card className="p-6 space-y-4">
            <Button
              className="w-full"
              size="lg"
              style={{ backgroundColor: "#479941", color: "white" }}
              onClick={() => navigate(`/video/${id}`)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Video Tutorial
            </Button>

            <Button
              className="w-full"
              size="lg"
              style={{ backgroundColor: "#52b14b", color: "white" }}
              onClick={() => {
                const pdfUrl = `${BASE_URL}/pdfs/${id}.pdf`;

                // 🚀 direct open (instant, no loading page)
                window.location.href = pdfUrl;
              }}
            >
              View PDF Guide
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Result;
