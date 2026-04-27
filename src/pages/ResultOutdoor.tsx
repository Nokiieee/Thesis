import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Home } from "lucide-react";
import { useEffect, useState } from "react";

import Spinner from "./Spinner";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState<BackendResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

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
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <img
                  src={logoSrc}
                  alt="Crop Logo"
                  className="w-20 h-20 object-contain"
                />
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

          <Card className="p-6 space-y-4">
            <Button
              className="w-full"
              size="lg"
              style={{ backgroundColor: "#73AF6F", color: "white" }}
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
              style={{ backgroundColor: "#73AF6F", color: "white" }}
              onClick={() => window.open(pdfFile, "_blank")}
            >
              View PDF Guide
            </Button>

            <Button
              className="w-full"
              size="lg"
              style={{ backgroundColor: "#628141", color: "white" }}
              onClick={() => {
                const link = document.createElement("a");
                link.href = pdfFile;
                link.download = recommendation.recommendation + ".pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download PDF Guide
            </Button>

            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => navigate("/")}
            >
              <Home className="w-5 h-5 mr-2" /> Back to Home
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultOutdoor;
