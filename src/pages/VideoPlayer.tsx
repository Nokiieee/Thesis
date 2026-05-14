import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { cropData } from "@/data/cropData";
import { indoorData } from "@/data/indoorData";

const VideoPlayer = () => {
  const location = useLocation();
  const from = (location.state as any)?.from || "/";

  const { videoId } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [language, setLanguage] = useState<"en" | "tl">("en");

  const allGuides = {
    ...cropData,
    ...indoorData,
  };

  const videoData: Record<
    string,
    {
      title: string;
      file: string;
    }
  > = {
    hydroponics: {
      title: "Hydroponics Guide",
      file: "/videos/hydroponics.mp4",
    },

    aquaponics: {
      title: "Aquaponics System Setup",
      file: "/videos/aquaponics.mp4",
    },

    aeroponics: {
      title: "Aeroponics Advanced",
      file: "/videos/aeroponics.mp4",
    },

    upo: {
      title: "Growing Upo (Bottle Gourd)",
      file: "/videos/upo.mp4",
    },

    ampalaya: {
      title: "Ampalaya (Bitter Gourd) Farming",
      file: "/videos/ampalaya.mp4",
    },

    patola: {
      title: "Patola (Sponge Gourd) Guide",
      file: "/videos/patola.mp4",
    },

    eggplant: {
      title: "Eggplant Cultivation",
      file: "/videos/eggplant.mp4",
    },

    sitaw: {
      title: "Sitaw (String Beans) Growing",
      file: "/videos/sitaw.mp4",
    },

    tomato: {
      title: "Tomato Farming Basics",
      file: "/videos/tomato.mp4",
    },

    squash: {
      title: "Squash Growing Guide",
      file: "/videos/squash.mp4",
    },

    "hot-pepper": {
      title: "Hot Pepper Cultivation",
      file: "/videos/hot-pepper.mp4",
    },

    okra: {
      title: "Okra Farming Essentials",
      file: "/videos/okra.mp4",
    },
  };

  const normalizeId = (id: string) => id.toLowerCase().replace(/\s+/g, "-");

  const normalizedVideoId = normalizeId(videoId ?? "");

  const currentVideo = videoData[normalizedVideoId];

  const currentGuide = allGuides[normalizedVideoId];

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4 flex items-center justify-center">
        <Card className="p-6 text-center">
          <p className="mb-4">Video not found</p>

          <Button onClick={() => navigate("/tutorials")}>
            Back to Tutorials
          </Button>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      const orientation = screen.orientation as any;

      if (document.fullscreenElement && orientation?.lock) {
        orientation.lock("landscape").catch(() => {
          console.log("Orientation lock failed");
        });
      } else if (orientation?.unlock) {
        orientation.unlock();
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="max-w-4xl mx-auto">
        <header className="p-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>

          <h1 className="text-xl font-bold">{currentVideo.title}</h1>
        </header>

        <div className="px-4 pb-4 space-y-4">
          <div className="aspect-video w-full max-h-[80vh] bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={currentVideo.file}
              controls
              preload="metadata"
              className="w-full h-full object-contain"
            />
          </div>

          {currentGuide && (
            <Card className="overflow-hidden">
              <div className="px-6 py-5 border-b flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {language === "en"
                      ? "Step-by-step Guide"
                      : "Sunod-sunod na Gabay"}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    {currentGuide.steps[language].length}{" "}
                    {language === "en" ? "steps included" : "na hakbang"}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center"
                  onClick={() => setLanguage(language === "en" ? "tl" : "en")}
                >
                  {language === "en" ? "Tagalog" : "English"}
                </Button>
              </div>

              <div className="px-6 py-5 space-y-3">
                {currentGuide.steps[language].map(
                  (step: string, index: number) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold ring-1 ring-primary/20">
                          {index + 1}
                        </div>

                        {index < currentGuide.steps[language].length - 1 && (
                          <div className="w-px flex-1 bg-border mt-1 min-h-[16px]" />
                        )}
                      </div>

                      <p className="text-sm leading-relaxed pb-3 pt-1 text-foreground/80 group-last:pb-0">
                        {step}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
