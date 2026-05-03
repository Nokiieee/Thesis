import { motion, AnimatePresence } from "framer-motion";

import AmpalayaLogo from "@/assets/logos/ampalaya.png";
import PatolaLogo from "@/assets/logos/patola.png";
import SquashLogo from "@/assets/logos/squash.png";
import UpoLogo from "@/assets/logos/upo.png";
import SitawLogo from "@/assets/logos/sitaw.png";
import EggplantLogo from "@/assets/logos/eggplant.png";
import TomatoLogo from "@/assets/logos/tomato.png";
import HotPepperLogo from "@/assets/logos/hot-pepper.png";
import OkraLogo from "@/assets/logos/okra.png";

import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Home } from "lucide-react";
import { useEffect, useState } from "react";

import Spinner from "./Spinner";

const cropLogos: Record<string, string[]> = {
  "Hardy Crops": [OkraLogo, SitawLogo],
  "Upright Crops": [EggplantLogo, HotPepperLogo, TomatoLogo],
  "Vining Crops": [AmpalayaLogo, PatolaLogo, SquashLogo, UpoLogo],
};

type BackendResponse = {
  recommendation: string;
  description: string;
  type: "outdoor";
  video_id: string;
};

const logoPath = (name: string) =>
  `/logos/${name.toLowerCase().replace(/\s+/g, "-")}_r.png`;
const pdfPath = (name: string) =>
  `/pdfs/${name.toLowerCase().replace(/\s+/g, "-")}.pdf`;

const ResultOutdoor = () => {
  const [logoIndex, setLogoIndex] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState<BackendResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recommendation) return;

    const logos = cropLogos[recommendation.recommendation] || [];

    const timer = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [recommendation]);

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    const answers = location.state; // ✔ Receive the numeric answers only

    if (!answers) {
      navigate("/");
      return;
    }

    const fetchOutdoorPrediction = async () => {
      try {
        console.log("OUTDOOR PAYLOAD:", answers); // ✔ Shows correct backend payload

        const res = await fetch(
          "https://thesis-ljvg.onrender.com/predict-outdoor", // http://localhost:8000/predict-outdoor | https://thesis-ljvg.onrender.com/predict-outdoor
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers), // ✔ Send ONLY numeric answers
          },
        );

        if (!res.ok) throw new Error("Outdoor backend error");

        const json: BackendResponse = await res.json();
        setRecommendation(json);
      } catch (err) {
        console.error(err);
        alert("Failed to load outdoor recommendation from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchOutdoorPrediction();
  }, [location.state, navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner loading={loading} />
      </div>
    );

  if (!recommendation) return null;

  const logoSrc = logoPath(recommendation.recommendation);
  const pdfFile = pdfPath(recommendation.recommendation);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        <header className="py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Your Outdoor Recommendation</h1>
        </header>

        <div className="space-y-6">
          <Card className="p-8 text-center bg-white">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={logoIndex}
                    src={
                      cropLogos[recommendation.recommendation]?.[logoIndex] ||
                      AmpalayaLogo // fallback
                    }
                    alt="Crop Logo"
                    className="w-20 h-20 object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-2">
              {recommendation.recommendation}
            </h2>
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Outdoor Farming
            </div>
            <p className="text-muted-foreground text-lg">
              {recommendation.description}
            </p>
          </Card>

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
                      src={`/logos/${crop.toLowerCase().replace(/\s+/g, "-")}_r.png`}
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
