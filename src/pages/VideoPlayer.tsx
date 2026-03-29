import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // All available videos
  const videoData: Record<
    string,
    { title: string; description: string; shortDescription?: string; file: string }
  > = {
    hydroponics: {
      title: "Hydroponics Guide",
      description: "Learn how to set up and maintain a hydroponic system.",
      shortDescription: "Set up and maintain your hydroponic system easily.",
      file: "/videos/hydroponics.mp4",
    },
    aquaponics: {
      title: "Aquaponics System Setup",
      description: "Create a sustainable aquaponics ecosystem.",
      shortDescription: "Build a sustainable aquaponics system.",
      file: "/videos/aquaponics.mp4",
    },
    aeroponics: {
      title: "Aeroponics Advanced",
      description: "Grow plants with suspended roots.",
      shortDescription: "Learn advanced aeroponics techniques.",
      file: "/videos/aeroponics.mp4",
    },
    upo: {
      title: "Growing Upo (Bottle Gourd)",
      description: "Complete guide for Bottle Gourd.",
      shortDescription: "Grow healthy Bottle Gourd with ease.",
      file: "/videos/upo.mp4",
    },
    ampalaya: {
      title: "Ampalaya (Bitter Gourd) Farming",
      description: "Best practices for bitter gourd cultivation.",
      shortDescription: "Master bitter gourd farming techniques.",
      file: "/videos/ampalaya.mp4",
    },
    patola: {
      title: "Patola (Sponge Gourd) Guide",
      description: "Step-by-step tutorial for patola farming.",
      shortDescription: "Learn how to grow patola efficiently.",
      file: "/videos/patola.mp4",
    },
    eggplant: {
      title: "Eggplant Cultivation",
      description: "How to grow healthy eggplants.",
      shortDescription: "Grow eggplants with maximum yield.",
      file: "/videos/eggplant.mp4",
    },
    sitaw: {
      title: "Sitaw (String Beans) Growing",
      description: "Guide to productive sitaw farming.",
      shortDescription: "Tips for high-yield sitaw farming.",
      file: "/videos/sitaw.mp4",
    },
    tomato: {
      title: "Tomato Farming Basics",
      description: "Grow productive tomato plants.",
      shortDescription: "Simple guide to growing tomatoes.",
      file: "/videos/tomato.mp4",
    },
    squash: {
      title: "Squash Growing Guide",
      description: "Planting and caring for squash.",
      shortDescription: "Learn to grow squash effectively.",
      file: "/videos/squash.mp4",
    },
    "hot-pepper": {
      title: "Hot Pepper Cultivation",
      description: "Grow flavorful hot peppers.",
      shortDescription: "Cultivate hot peppers with best practices.",
      file: "/videos/hot-pepper.mp4",
    },
    okra: {
      title: "Okra Farming Essentials",
      description: "How to cultivate okra from planting to harvest.",
      shortDescription: "Step-by-step okra farming guide.",
      file: "/videos/okra.mp4",
    },
  };

  const normalizeId = (id: string) => id.toLowerCase().replace(/\s+/g, "-");
  const currentVideo = videoData[normalizeId(videoId ?? "")];

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4 flex items-center justify-center">
        <Card className="p-6 text-center">
          <p className="mb-4">Video not found</p>
          <Button onClick={() => navigate("/tutorials")}>Back to Tutorials</Button>
        </Card>
      </div>
    );
  }

  // Lock landscape on fullscreen
  useEffect(() => {
  const handleFullScreenChange = () => {
    const orientation = screen.orientation as any; // Type assertion
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
          <Button variant="ghost" size="icon" onClick={() => setShowConfirm(true)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">{currentVideo.title}</h1>
        </header>

        <div className="px-4 pb-4 space-y-4">
          {/* Video Player */}
          <div className="aspect-video w-full max-h-[80vh] bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={currentVideo.file}
              controls
              preload="metadata"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Description Card */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">{currentVideo.title}</h2>
            <p className="text-muted-foreground">
              {currentVideo.shortDescription ?? currentVideo.description}
            </p>
          </Card>

          {/* Back to Home Button */}
          <div className="flex justify-center">
            <Button
              style={{ backgroundColor: "#628141", color: "white" }}
              onClick={() => setShowConfirm(true)}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="flex flex-col gap-4 p-6">
                <h2 className="text-xl font-bold">Are you sure?</h2>
                <p className="text-muted-foreground">
                  Going back to Home will stop the video. Do you want to continue?
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowConfirm(false)}>
                    Cancel
                  </Button>
                  <Button
                    style={{ backgroundColor: "#628141", color: "white" }}
                    onClick={() => navigate("/")}
                  >
                    Yes, Go Back
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
