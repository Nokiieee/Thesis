import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Home } from "lucide-react";
import { useEffect, useState } from "react";

import Spinner from "./Spinner";

type BackendResponse = {
  recommendation: string;
  description: string;
  type: "indoor" | "outdoor";
  video_id: string;
};

const logoPath = (name: string) =>
  `/logos/${name.toLowerCase().replace(/\s+/g, "-")}.png`;
const pdfPath = (name: string) =>
  `/pdfs/${name.toLowerCase().replace(/\s+/g, "-")}.pdf`;

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState<BackendResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("RESULT PAGE LOADED");

    const data = location.state;
    console.log("DATA:", data);

    if (!data) {
      console.log("NO DATA → redirecting");
      navigate("/");
      return;
    }

    const fetchPrediction = async () => {
      console.log("FETCH STARTED");

      try {
        const res = await fetch(
          "https://thesis-ljvg.onrender.com/predict-indoor", // http://localhost:8000/predict-indoor | https://thesis-ljvg.onrender.com/predict-indoor
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
        );

        console.log("FETCH SENT");

        const json = await res.json();
        console.log("RESPONSE:", json);

        if (!res.ok) {
          throw new Error(json?.detail || "Backend error");
        }

        setRecommendation(json);

        setRecommendation(json);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        alert("Failed to load recommendation from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [location.state, navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner loading={loading} />
      </div>
    );

  if (!recommendation) return null;

  const logoSrc = recommendation?.recommendation
    ? logoPath(recommendation.recommendation)
    : "";

  const pdfFile = recommendation?.recommendation
    ? pdfPath(recommendation.recommendation)
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        <header className="py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Your Recommendation</h1>
        </header>

        <div className="space-y-6">
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <img
                  src={logoSrc}
                  alt="Farming Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-2">
              {recommendation.recommendation}
            </h2>
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {recommendation.type === "indoor"
                ? "Indoor Farming"
                : "Outdoor Farming"}
            </div>
            <p className="text-muted-foreground text-lg">
              {recommendation.description}
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <Button
              className="w-full"
              size="lg"
              style={{ backgroundColor: "#479941", color: "white" }}
              onClick={() =>
                navigate(
                  `/video/${recommendation.recommendation.toLowerCase().replace(/\s+/g, "-")}`,
                )
              }
            >
              <Play className="w-5 h-5 mr-2" /> Watch Tutorial Video
            </Button>

            <Button
              className="w-full"
              size="lg"
              style={{ backgroundColor: "#52b14b", color: "white" }}
              onClick={() => window.open(pdfFile, "_blank")}
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
