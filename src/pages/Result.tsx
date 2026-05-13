import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

import { indoorData } from "@/data/indoorData";

type BackendResponse = {
  recommendation: string;
  description: string;
  type: "indoor" | "outdoor";
  video_id: string;
};

const BASE_URL = "https://thesis-ljvg.onrender.com";

const logoPath = (name: string) =>
  `/logos/${name.toLowerCase().replace(/\s+/g, "-")}.png`;

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🌐 Language state
  const [language, setLanguage] = useState<"en" | "tl">("en");

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

  const crop = indoorData[id];

  // ✅ Get translated steps
  const currentSteps =
    language === "en" ? crop?.steps.en || [] : crop?.steps.tl || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <header className="py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>

          <h1 className="text-2xl font-bold">
            {language === "en" ? "Your Recommendation" : "Iyong Rekomendasyon"}
          </h1>
        </header>

        <div className="space-y-6">
          {/* MAIN CARD */}
          <Card className="p-8 text-center">
            {/* ICON */}
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
              {language === "en"
                ? crop?.title.en || recommendation.recommendation
                : crop?.title.tl || recommendation.recommendation}
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

          {/* STEP-BY-STEP */}
          {crop && (
            <Card className="overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide">
                    {language === "en"
                      ? "Step-by-step Guide"
                      : "Sunod-sunod na Gabay"}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    {currentSteps.length}{" "}
                    {language === "en" ? "steps included" : "na hakbang"}
                  </p>
                </div>

                {/* 🌐 LANGUAGE BUTTON */}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center"
                  onClick={() => setLanguage(language === "en" ? "tl" : "en")}
                >
                  {language === "en" ? "Tagalog" : "English"}
                </Button>
              </div>

              {/* Steps */}
              <div className="px-6 py-5 space-y-3">
                {currentSteps.map((step: string, index: number) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex flex-col items-center flex-shrink-0">
                      {/* Number */}
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold ring-1 ring-primary/20">
                        {index + 1}
                      </div>

                      {/* Line */}
                      {index < currentSteps.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-1 min-h-[16px]" />
                      )}
                    </div>

                    {/* Step Text */}
                    <p className="text-sm leading-relaxed pb-3 pt-1 text-foreground/80 group-last:pb-0">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ACTION BUTTONS (STICKY) */}
          <div className="sticky bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t">
            <div className="max-w-2xl mx-auto p-4">
              <Card className="p-4 space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  style={{ backgroundColor: "#479941", color: "white" }}
                  onClick={() => navigate(`/video/${id}`)}
                >
                  <Play className="w-5 h-5 mr-2" />

                  {language === "en"
                    ? "Watch Video Tutorial"
                    : "Panoorin ang Video Tutorial"}
                </Button>

                <Button
                  className="w-full"
                  size="lg"
                  style={{ backgroundColor: "#6aa357", color: "white" }}
                  onClick={() => {
                    const pdfUrl = `${BASE_URL}/pdfs/${id}.pdf`;
                    window.location.href = pdfUrl;
                  }}
                >
                  {language === "en"
                    ? "View PDF Guide"
                    : "Tingnan ang PDF Guide"}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
