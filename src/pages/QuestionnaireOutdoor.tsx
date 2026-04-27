// QuestionnaireOutdoor.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
  id: string;
  question: string;
  options: string[];
};

// --------------------
// Outdoor questions
// --------------------
const outdoorQuestions: Question[] = [
  {
    id: "planting_space",
    question: "How much planting space do you have available?",
    options: ["Small", "Medium", "Large"],
  },
  {
    id: "soil_type",
    question:
      "If you squeeze a handful of wet soil from your area, what happens?",
    options: ["Clay", "Loam", "Sandy"],
  },
  {
    id: "sunlight_hours",
    question: "How much direct sunlight does your planting area receive daily?",
    options: ["Shaded", "Partial Sun", "Full Sun"],
  },
  {
    id: "water_usage",
    question: "How would you describe your access to a water source?",
    options: ["Low", "Moderate", "High"],
  },
  {
    id: "watering_frequency",
    question: "How often are you able to water your crops?",
    options: ["Infrequent", "Moderate", "Frequent"],
  },
  {
    id: "flood_prone",
    question: "How prone is your area to flooding during heavy rains?",
    options: ["Low Risk", "Moderate Risk", "High Risk"],
  },
  {
    id: "avg_temperature",
    question: "What is the typical temperature in your planting area?",
    options: ["Cool", "Warm", "Hot"],
  },
  {
    id: "monthly_budget",
    question: "What is your budget for seeds, fertilizers, and trellises?",
    options: ["Low", "Medium", "High"],
  },
  {
    id: "daily_care_time",
    question: "How much time can you spend on maintenance each week?",
    options: ["Low", "Medium", "High"],
  },
  {
    id: "pest_level",
    question: "How severe is the pest and insect problem in your area?",
    options: ["Low", "Moderate", "High"],
  },
  {
    id: "area_drainage",
    question: "What does the ground look like a few hours after a heavy rain?",
    options: ["Poor Drainage", "Fair Drainage", "Good Drainage"],
  },
  {
    id: "fertilizer_access",
    question: "Do you have access to organic or synthetic fertilizers?",
    options: ["Low", "Moderate", "High"],
  },
  {
    id: "wind_condition",
    question: "How exposed is your planting area to strong winds?",
    options: ["Low", "Moderate", "High"],
  },
  {
    id: "planting_purpose",
    question: "What is your primary purpose for planting?",
    options: ["Personal", "Small-scale", "Commercial"],
  },
  {
    id: "farming_experience",
    question: "How would you rate your farming or gardening experience?",
    options: ["Beginner", "Intermediate", "Experienced"],
  },
];

// --------------------
// Mapping options → numbers
// --------------------
const optionToNumber = (id: string, value: string) => {
  const map: Record<string, Record<string, number>> = {
    planting_space: { Small: 0, Medium: 1, Large: 2 },
    soil_type: { Clay: 0, Loam: 1, Sandy: 2 },
    sunlight_hours: { Shaded: 0, "Partial Sun": 1, "Full Sun": 2 },
    water_usage: { Low: 0, Moderate: 1, High: 2 },
    watering_frequency: { Infrequent: 0, Moderate: 1, Frequent: 2 },
    flood_prone: { "Low Risk": 0, "Moderate Risk": 1, "High Risk": 2 },
    avg_temperature: { Cool: 0, Warm: 1, Hot: 2 },
    monthly_budget: { Low: 0, Medium: 1, High: 2 },
    daily_care_time: { Low: 0, Medium: 1, High: 2 },
    pest_level: { Low: 0, Moderate: 1, High: 2 },
    area_drainage: {
      "Poor Drainage": 0,
      "Fair Drainage": 1,
      "Good Drainage": 2,
    },
    fertilizer_access: { Low: 0, Moderate: 1, High: 2 },
    wind_condition: { Low: 0, Moderate: 1, High: 2 },
    planting_purpose: {
      Personal: 0,
      "Small-scale": 1,
      Commercial: 2,
    },
    farming_experience: { Beginner: 0, Intermediate: 1, Experienced: 2 },
  };

  return map[id][value];
};

// --------------------
// Frontend → Backend key mapping
// --------------------
const frontendToBackendKeys: Record<string, string> = {
  planting_space: "Space_Size",
  soil_type: "Soil_Type",
  sunlight_hours: "Sunlight",
  water_usage: "Water_Availability",
  watering_frequency: "Watering_Frequency",
  flood_prone: "Flood_Risk",
  avg_temperature: "Temperature",
  monthly_budget: "Budget",
  daily_care_time: "Time_Available",
  pest_level: "Pest_Level",
  area_drainage: "Drainage",
  fertilizer_access: "Fertilizer_Access",
  wind_condition: "Wind_Exposure",
  planting_purpose: "Planting_Purpose",
  farming_experience: "Farming_Experience", // ✅ NEW
};

// --------------------
// Component
// --------------------
const QuestionnaireOutdoor = () => {
  const navigate = useNavigate();
  const questions = outdoorQuestions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleBackArrow = () => setShowConfirm(true);
  const handleConfirmBack = () => {
    setShowConfirm(false);
    navigate("/questionnaire-type");
  };
  const handlePrevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleNext = () => {
    if (!answers[current.id]) {
      toast.error("Please select an answer.");
      return;
    }

    if (step + 1 === questions.length) {
      // --------------------
      // Convert frontend answers → backend keys & numeric values
      // --------------------
      const payload: Record<string, number> = {};

      for (const frontendKey in frontendToBackendKeys) {
        const backendKey = frontendToBackendKeys[frontendKey];
        const answer = answers[frontendKey];
        payload[backendKey] =
          answer !== undefined ? optionToNumber(frontendKey, answer) : 0;
      }

      console.log("Payload sent to backend:", payload);

      // Debug: check payload before sending
      console.log("Payload sent to backend:", payload);

      // --------------------
      // Call outdoor backend (note: backend runs on port 8001 in this setup)
      // --------------------
      fetch("https://thesis-ljvg.onrender.com/predict-outdoor", {
        // http://localhost:8000/predict-outdoor | https://thesis-ljvg.onrender.com/predict-outdoor
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            console.error("Backend returned status:", res.status);
            throw new Error("Backend error");
          }
          return res.json();
        })
        .then((data) => navigate("/result-outdoor", { state: payload }))
        .catch((err) => {
          console.error("Fetch error:", err);
          toast.error("Failed to get outdoor prediction.");
        });
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <header className="py-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBackArrow}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Outdoor Farming Questionnaire</h1>
          <p className="text-sm text-muted-foreground">
            Question {step + 1} of {questions.length}
          </p>
        </div>
      </header>

      <div className="max-w-xl mx-auto mt-6">
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">{current.question}</h2>
          <div className="space-y-3">
            {current.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setAnswers({ ...answers, [current.id]: opt })}
                className={`w-full py-2 px-4 rounded-md font-medium text-left transition-colors ${
                  answers[current.id] === opt
                    ? "bg-[#628141] text-white"
                    : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevStep}
              className="py-2 px-4 rounded-md font-medium transition-colors"
              style={{ backgroundColor: "#628141", color: "white" }}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="py-2 px-4 rounded-md font-medium transition-colors"
              style={{ backgroundColor: "#628141", color: "white" }}
            >
              {step + 1 === questions.length ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2" /> Finish
                </>
              ) : (
                "Next"
              )}
            </button>
          </div>

          <div className="w-full h-2 bg-muted rounded-full mt-4">
            <div
              className="h-2 bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>
      </div>

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
                  Going back will discard your current progress. Continue?
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ backgroundColor: "#628141", color: "white" }}
                    onClick={handleConfirmBack}
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

export default QuestionnaireOutdoor;
