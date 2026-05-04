import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import Spinner from "./Spinner";

// ✅ NEW STATIC CATEGORY IMAGES
import UprightPNG from "@/assets/logos/upright.png";
import HardyPNG from "@/assets/logos/hardy.png";
import ViningPNG from "@/assets/logos/vining.png";

type BackendResponse = {
  recommendation: string;
  description: string;
  type: "outdoor";
  video_id: string;
};

// ✅ CATEGORY → IMAGE MAP
const categoryImages: Record<string, string> = {
  "Hardy Crops": HardyPNG,
  "Upright Crops": UprightPNG,
  "Vining Crops": ViningPNG,
};

const pdfPath = (name: string) =>
  `/pdfs/${name.toLowerCase().replace(/\s+/g, "-")}.pdf`;

const ResultOutdoor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [recommendation, setRecommendation] = useState<BackendResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH RECOMMENDATION
  ========================== */
  useEffect(() => {
    const answers = location.state;

    if (!answers) {
      navigate("/");
      return;
    }

    const fetchOutdoorPrediction = async () => {
      try {
        const res = await fetch(
          "https://thesis-ljvg.onrender.com/predict-outdoor",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers),
          },
        );

        if (!res.ok) throw new Error("Outdoor backend error");

        const json: BackendResponse = await res.json();
        setRecommendation(json);
      } catch (err) {
        console.error(err);
        alert("Failed to load outdoor recommendation.");
      } finally {
        setLoading(false);
      }
    };

    fetchOutdoorPrediction();
  }, [location.state, navigate]);

  /* =========================
     LOADING
  ========================== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner loading={true} />
      </div>
    );
  }

  if (!recommendation) return null;

  const pdfFile = pdfPath(recommendation.recommendation);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <header className="py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Your Outdoor Recommendation</h1>
        </header>

        <div className="space-y-6">
          {/* MAIN CARD */}
          <Card className="p-8 text-center bg-white">
            {/* STATIC IMAGE */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <img
                  src={categoryImages[recommendation.recommendation]}
                  alt="Category"
                  className="w-26 h-26 object-contain"
                />
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-3xl font-bold mb-2">
              {recommendation.recommendation}
            </h2>

            {/* BADGE */}
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Outdoor Farming
            </div>

            {/* DESCRIPTION */}
            <p className="text-muted-foreground text-lg">
              {recommendation.description}
            </p>
          </Card>

          {/* CROPS GRID */}
          <Card className="p-6 space-y-4 text-center">
            <h3 className="text-xl font-semibold mb-2">Recommended Crops</h3>

            <div className="grid grid-cols-2 gap-4">
              {(() => {
                const cropMap: Record<string, string[]> = {
                  "Hardy Crops": ["Okra", "Sitaw"],
                  "Upright Crops": ["Eggplant", "Hot Pepper", "Tomato"],
                  "Vining Crops": ["Ampalaya", "Patola", "Squash", "Upo"],
                };

                const crops = cropMap[recommendation.recommendation] || [];

                return crops.map((crop) => (
                  <a
                    key={crop}
                    href={`/crop/${crop.toLowerCase().replace(/\s+/g, "-")}`}
                    className="aspect-square flex flex-col items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100 transition-all text-lg font-medium p-4"
                  >
                    <img
                      src={`/logos/${crop
                        .toLowerCase()
                        .replace(/\s+/g, "-")}_r.png`}
                      alt={crop}
                      className="w-3/5 h-3/5 object-contain mb-2"
                    />
                    <span>{crop}</span>
                  </a>
                ));
              })()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultOutdoor;
