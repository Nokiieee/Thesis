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

const indoorQuestions: Question[] = [
  {
    id: "available_space",
    question: "How much indoor space can you dedicate to your setup?",
    options: [
      "Small: A countertop, closet, or tiny corner.",
      "Medium: A spare room, balcony, or small home greenhouse.",
      "Large: A dedicated warehouse or commercial greenhouse space.",
    ],
  },
  {
    id: "power_availability",
    question: "How stable is your electricity and backup power?",
    options: [
      "Unreliable: Power goes out often and I have no backup battery or generator.",
      "Moderate: Occasional outages, but I can manually start a generator if needed.",
      "Highly Stable: Power is constant or I have an automatic backup (UPS) that kicks in instantly.",
    ],
  },
  {
    id: "lighting_setup",
    question: "What kind of light will your plants receive?",
    options: [
      "Low Natural Light: Only sunlight from a nearby standard window.",
      "Basic Artificial Light: Standard fluorescent tubes or basic LED grow lights.",
      "High-Intensity Light: Professional high-wattage LED grow lights or full sun in a greenhouse.",
    ],
  },
  {
    id: "access_to_water",
    question: "How easy is it to get water to and from your setup?",
    options: [
      "Low: I have to carry water by hand/buckets and there are no floor drains.",
      "Moderate: I can easily use a hose or refill a medium water tank nearby.",
      "High: I have direct plumbing, faucets, and floor drains in the room.",
    ],
  },
  {
    id: "pH_monitoring",
    question: "Are you willing to test the water chemistry every day?",
    options: [
      "None: No, I just want to use plain tap water without any testing.",
      "Daily Manual: Yes, I can use handheld pens to test and adjust the water every day.",
      "Advanced: Yes, I will use automated machines that monitor and fix the water 24/7.",
    ],
  },
  {
    id: "avg_temp",
    question: "How much control do you have over the room's temperature?",
    options: [
      "Poor: Very little; the room gets very hot or cold depending on the weather.",
      "Moderate: Some control using basic fans, window A/C, or home heaters.",
      "Excellent: Strict control using a professional HVAC or climate system.",
    ],
  },
  {
    id: "ventilation_quality",
    question: "How is the air circulation in your growing area?",
    options: [
      "Stagnant: A closed room with still air and no fans.",
      "Moderate: Decent airflow using basic fans or open windows.",
      "High: Strong airflow using exhaust fans and professional ventilation.",
    ],
  },
  {
    id: "capital_budget",
    question: "What is your budget for equipment (pumps, towers, and lights)?",
    options: [
      "Low: Minimal budget; I plan to use DIY setups and recycled materials.",
      "Medium: I can buy standard water pumps, air stones, and PVC pipes.",
      "High: I am willing to invest in professional towers or high-pressure misting kits.",
    ],
  },
  {
    id: "daily_time_commitment",
    question: "How much time can you spend on daily maintenance?",
    options: [
      "10 to 30 Minutes: Just enough for a quick daily check and to see if plants are wilting.",
      "30 to 60 Minutes: Enough for daily cleaning, refilling water, and checking for bugs.",
      "Over 60 Minutes: Enough for deep cleaning nozzles and checking every single leaf and root.",
    ],
  },
  {
    id: "noise_tolerance",
    question: "How much equipment noise is allowed in the area?",
    options: [
      "Silent: It must be completely quiet (like a bedroom).",
      "Low Hum: Soft bubbling or small pump sounds are okay.",
      "Loud: Water splashing and loud misting sounds are perfectly fine.",
    ],
  },
  {
    id: "cleanliness",
    question: "How clean and isolated is your growing area?",
    options: [
      "Low: Open area where pets, dust, and outside air come in easily.",
      "Moderate: A dedicated, reasonably clean room inside a house.",
      'High: A sealed, sanitized room with strict "no-germs" protocols.',
    ],
  },
  {
    id: "nutrient_method",
    question: "How do you want to provide nutrients to your plants?",
    options: [
      "Natural/Fish Waste: Using a natural ecosystem with fish (Aquaponics).",
      "Liquid Mix: Using simple, ready-to-mix liquid plant food.",
      "Chemical Mix: Precisely measuring and mixing raw minerals and salts.",
    ],
  },
  {
    id: "interest_in_fish",
    question: "Are you interested in raising fish along with your plants?",
    options: [
      "No: I only want to grow plants.",
      "Yes: I want to manage fish feeding and fish tank cleaning every day.",
    ],
  },
  {
    id: "goal_type",
    question: "What is your primary reason for planting?",
    options: [
      "Personal: Just for me and my family to eat.",
      "Small-scale: Selling a little bit to neighbors or at a local market.",
      "Commercial: Mass production for a serious business.",
    ],
  },
  {
    id: "training_experience",
    question: "How much experience do you have with technical farming?",
    options: [
      "Beginner: I am new to water pumps, nutrients, and soilless farming.",
      "Intermediate: I understand basic plumbing and manual water testing.",
      "Experienced: I can fix equipment and spot plant problems just by looking at them.",
    ],
  },
];

const frontendToDatasetKey: Record<string, string> = {
  available_space: "Space_Size",
  power_availability: "Power_Reliability",
  lighting_setup: "Lighting",
  access_to_water: "Water_Accessibility",
  pH_monitoring: "Water_Chemistry",
  avg_temp: "Temperature_Control",
  ventilation_quality: "Ventilation",
  capital_budget: "Budget",
  daily_time_commitment: "Time_Available",
  noise_tolerance: "Noise_Tolerance",
  cleanliness: "Biosecurity",
  nutrient_method: "Nutrient_Source",
  interest_in_fish: "Aquaculture",
  goal_type: "Purpose",
  training_experience: "Experience",
};

const optionToNumber = (questionId: string, value: string) => {
  const label = value.split(":")[0].trim();

  const map: Record<string, Record<string, number>> = {
    available_space: { Small: 0, Medium: 1, Large: 2 },

    power_availability: {
      Unreliable: 0,
      Moderate: 1,
      "Highly Stable": 2,
    },

    lighting_setup: {
      "Low Natural Light": 0,
      "Basic Artificial Light": 1,
      "High-Intensity Light": 2,
    },

    access_to_water: { Low: 0, Moderate: 1, High: 2 },

    pH_monitoring: {
      None: 0,
      "Daily Manual": 1,
      Advanced: 2,
    },

    avg_temp: { Poor: 0, Moderate: 1, Excellent: 2 },

    ventilation_quality: { Stagnant: 0, Moderate: 1, High: 2 },

    capital_budget: { Low: 0, Medium: 1, High: 2 },

    daily_time_commitment: {
      "10 to 30 Minutes": 0,
      "30 to 60 Minutes": 1,
      "Over 60 Minutes": 2,
    },

    noise_tolerance: { Silent: 0, "Low Hum": 1, Loud: 2 },

    cleanliness: { Low: 0, Moderate: 1, High: 2 },

    nutrient_method: {
      "Natural/Fish Waste": 0,
      "Liquid Mix": 1,
      "Chemical Mix": 2,
    },

    interest_in_fish: {
      No: 0,
      Yes: 2,
    },

    goal_type: {
      Personal: 0,
      "Small-scale": 1,
      Commercial: 2,
    },

    training_experience: {
      Beginner: 0,
      Intermediate: 1,
      Experienced: 2,
    },
  };

  return map[questionId]?.[label] ?? 0;
};

type Props = { farmingType: "Indoor" | "Outdoor" };

const Questionnaire = ({ farmingType }: Props) => {
  const navigate = useNavigate();
  const questions = indoorQuestions; // only indoor for now
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
      const payload: Record<string, number> = {};

      for (const q of indoorQuestions) {
        const key = q.id;
        const datasetKey = frontendToDatasetKey[key];
        const value = answers[key];

        if (!datasetKey) continue;

        if (value === undefined) {
          toast.error(`Missing answer: ${q.question}`);
          return;
        }

        const numeric = optionToNumber(key, value);

        if (numeric === undefined || isNaN(numeric)) {
          toast.error(`Invalid value for ${key}`);
          return;
        }

        payload[datasetKey] = numeric;
      }

      console.log("Payload sent to backend:", payload);
      navigate("/result", { state: payload });
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
          <h1 className="text-2xl font-bold">
            {farmingType} Farming Questionnaire
          </h1>
          <p className="text-sm text-muted-foreground">
            Question {step + 1} of {questions.length}
          </p>
        </div>
      </header>

      <div className="max-w-xl mx-auto mt-6">
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">{current.question}</h2>
          <div className="space-y-3">
            {current.options.map((opt) => {
              const isSelected = answers[current.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setAnswers({ ...answers, [current.id]: opt })}
                  className={`w-full py-2 px-4 rounded-md font-medium text-left transition-colors ${
                    isSelected
                      ? "bg-[#628141] text-white"
                      : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevStep}
              className="py-2 px-4 rounded-md font-medium flex items-center justify-center transition-colors"
              style={{ backgroundColor: "#628141", color: "white" }}
            >
              Prev
            </button>

            <button
              onClick={handleNext}
              className="py-2 px-4 rounded-md font-medium flex items-center justify-center transition-colors"
              style={{ backgroundColor: "#628141", color: "white" }}
            >
              {step + 1 === questions.length ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Finish
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
                  Going back will discard your current progress. Do you want to
                  continue?
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

export default Questionnaire;
