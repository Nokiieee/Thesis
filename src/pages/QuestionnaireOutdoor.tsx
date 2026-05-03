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
    question: "How much outdoor space can you dedicate to your garden?",
    options: [
      "Small: I only have enough room for pots, cans, or hanging containers.",
      "Medium: I have a small backyard plot or a few raised garden beds.",
      "Large: I have a wide open yard or a vacant lot for farming.",
    ],
  },
  {
    id: "soil_type",
    question: "What does your soil feel like?",
    options: [
      "Clayey: The dirt is sticky, heavy, and hard to dig when wet.",
      "Loamy: The soil is dark, crumbly, and feels like healthy garden earth.",
      "Sandy: The soil is gritty and water runs through it like a beach.",
    ],
  },
  {
    id: "sunlight_hours",
    question: "How much direct sunlight does your area receive daily?",
    options: [
      "Low/Shade: My area is mostly shaded; plants get less than 3 hours of sun.",
      "Partial Sun: My plants will get sun for only half the day (about 4-6 hours).",
      "Full Sun: My area gets direct, hot sunlight all day long (over 6 hours).",
    ],
  },
  {
    id: "water_usage",
    question: "How do you get your water?",
    options: [
      "Limited: I have no faucet nearby and must wait for the rain.",
      "Moderate: I have a nearby water source but I have to carry it by hand.",
      "High: I have a garden hose or a pump that reaches my plants easily.",
    ],
  },
  {
    id: "watering_frequency",
    question: "How often are you willing to water your plants?",
    options: [
      "Occasionally: I can only water them when I have free time or if it doesn't rain.",
      "Daily: I can commit to watering my garden every single morning.",
      "Twice a Day: I can water them every morning and every afternoon.",
    ],
  },
  {
    id: "flood_prone",
    question: "Does your garden area ever experience flooding?",
    options: [
      "None: My area stays dry even during the peak of the rainy season.",
      "Low: Water rises slightly during storms but disappears within an hour.",
      "High: My garden area often turns into a pond when it rains hard.",
    ],
  },
  {
    id: "avg_temperature",
    question: "How hot is the typical daytime weather in your location?",
    options: [
      "Cool: The air is usually breezy and feels refreshed/mountain-like.",
      "Average: It feels like normal, warm Philippine lowland weather.",
      "Very Hot: The heat is intense and the ground dries up very quickly.",
    ],
  },
  {
    id: "monthly_budget",
    question: "How would you describe your budget for starting materials?",
    options: [
      "Low: Under ₱500; relying on recycled materials and homemade compost.",
      "Medium: ₱500 to ₱2,000; can buy commercial seeds and standard fertilizers.",
      "High: Over ₱2,000; can afford hybrid seeds and sturdy farm structures.",
    ],
  },
  {
    id: "daily_care_time",
    question: "How much time can you spend on garden maintenance daily?",
    options: [
      "Low: Under 30 minutes a day; I can only do a quick visual check or minimal watering.",
      "Medium: 30 minutes to 1 hour a day; I can handle routine watering, weeding, and basic care.",
      "High: Over 1 hour a day; I can commit to heavy daily tasks like pruning, tying vines, and managing pests.",
    ],
  },
  {
    id: "pest_level",
    question: "Do you see a lot of bugs or pests in your area?",
    options: [
      "Low: I rarely see insects or worms eating the plants.",
      "Moderate: I see a normal amount of bugs that need occasional cleaning.",
      "High: There are many pests that seem to attack everything I plant.",
    ],
  },
  {
    id: "area_drainage",
    question: "What happens to the water in your soil after a heavy rain?",
    options: [
      "Poor: The water stays in puddles and the soil remains muddy for days.",
      "Fair: The water disappears eventually, but the ground stays soggy for a while.",
      "Good: The water sinks into the dirt almost immediately after it stops raining.",
    ],
  },
  {
    id: "fertilizer_access",
    question: "Do you have easy access to fertilizers?",
    options: [
      "No Access: I don't have a way to get or make plant food.",
      "Limited: I can get some organic compost or manure occasionally.",
      "Full Access: I can easily buy or create plenty of fertilizer for my crops.",
    ],
  },
  {
    id: "wind_condition",
    question: "Is your planting site protected from strong winds?",
    options: [
      "Protected: My plants are shielded by walls, fences, or trees.",
      "Moderate: There is a steady breeze but no strong gusts.",
      "High: My area is wide open and the wind can knock things over.",
    ],
  },
  {
    id: "planting_season",
    question: "In which season do you plan to start your planting?",
    options: [
      "Dry Season: I am starting while the weather is sunny and dry (Dec to May).",
      "Wet Season: I am starting during the rainy months (June to Nov).",
      "Year-round: I want a crop that I can plant regardless of the current month.",
    ],
  },
  {
    id: "farming_experience",
    question: "How much gardening experience do you have?",
    options: [
      "Beginner: This is my first time trying to grow anything.",
      "Intermediate: I have successfully grown a few plants in the past.",
      "Experienced: I can handle sensitive crops, strict pruning, and pest control.",
    ],
  },
];

// --------------------
// Mapping options → numbers
// --------------------
const optionToNumber = (id: string, value: string) => {
  // Extract label before colon
  const label = value.split(":")[0].trim();

  const map: Record<string, Record<string, number>> = {
    planting_space: { Small: 0, Medium: 1, Large: 2 },

    soil_type: { Clayey: 0, Loamy: 1, Sandy: 2 },

    sunlight_hours: {
      "Low/Shade": 0,
      "Partial Sun": 1,
      "Full Sun": 2,
    },

    water_usage: { Limited: 0, Moderate: 1, High: 2 },

    watering_frequency: {
      Occasionally: 0,
      Daily: 1,
      "Twice a Day": 2,
    },

    flood_prone: { None: 0, Low: 1, High: 2 },

    avg_temperature: { Cool: 0, Average: 1, "Very Hot": 2 },

    monthly_budget: { Low: 0, Medium: 1, High: 2 },

    daily_care_time: { Low: 0, Medium: 1, High: 2 },

    pest_level: { Low: 0, Moderate: 1, High: 2 },

    area_drainage: { Poor: 0, Fair: 1, Good: 2 },

    fertilizer_access: {
      "No Access": 0,
      Limited: 1,
      "Full Access": 2,
    },

    wind_condition: { Protected: 0, Moderate: 1, High: 2 },

    planting_season: {
      "Dry Season": 0,
      "Wet Season": 1,
      "Year-round": 2,
    },

    farming_experience: { Beginner: 0, Intermediate: 1, Experienced: 2 },
  };

  return map[id][label];
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
      fetch("http://localhost:8000/predict-outdoor", {
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
