import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";

import { cropData } from "@/data/cropData";

const Crops = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "tl">("en");
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
        <Button onClick={() => navigate(-1)}>← Back</Button>

        <Card className="overflow-hidden">
          <div className="px-6 py-5 border-b flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                {language === "en" ? crop.title.en : crop.title.tl}
              </h1>

              <p className="text-sm text-muted-foreground mt-1">
                {crop.steps[language].length}{" "}
                {language === "en"
                  ? "steps to a successful harvest"
                  : "na hakbang para sa matagumpay na ani"}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "tl" : "en")}
            >
              {language === "en" ? "Tagalog" : "English"}
            </Button>
          </div>

          <div className="px-6 py-5 space-y-3">
            <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              {language === "en"
                ? "Step-by-step Guide"
                : "Hakbang-hakbang na Gabay"}
            </h2>

            {crop.steps[language].map((step: string, index: number) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold ring-1 ring-primary/20">
                    {index + 1}
                  </div>

                  {index < crop.steps[language].length - 1 && (
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

        <Card className="p-6 space-y-4">
          <Button
            className="w-full"
            style={{
              backgroundColor: "#479941",
              color: "white",
            }}
            onClick={() => navigate(`/video/${id}`)}
          >
            <Play className="w-5 h-5 mr-2" />

            {language === "en"
              ? "Watch Video Tutorial"
              : "Panoorin ang Video Tutorial"}
          </Button>

          <Button
            className="w-full"
            style={{
              backgroundColor: "#6aa357",
              color: "white",
            }}
            onClick={() => {
              const pdfUrl = `https://thesis-ljvg.onrender.com/pdfs/${id}.pdf`;

              window.location.href = pdfUrl;
            }}
          >
            {language === "en" ? "View PDF Guide" : "Tingnan ang PDF Guide"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Crops;
