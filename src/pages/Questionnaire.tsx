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

// Indoor questions
const indoorQuestions: Question[] = [
  { id: "avg_temp", question: "Average temperature of your indoor space?", options: ["Cool (18–21°C)", "Moderate (22–25°C)", "Warm (26–29°C)"] },
  { id: "humidity_control", question: "Do you have humidity control?", options: ["No", "Partial", "Yes"] },
  { id: "available_space", question: "Available planting space?", options: ["Small (<5 m²)", "Medium (5–15 m²)", "Large (>15 m²)"] },
  { id: "access_to_water", question: "Do you have reliable access to water?", options: ["No", "Sometimes", "Always"] },
  { id: "power_availability", question: "How consistent is your power availability?", options: ["No", "Sometimes", "Yes"] },
  { id: "capital_budget", question: "What is your capital budget?", options: ["Low", "Medium", "High"] },
  { id: "tech_comfort_level", question: "What is your comfort level with technology?", options: ["Low", "Medium", "High"] },
  { id: "training_experience", question: "What is your farming experience level?", options: ["None", "Some", "Extensive"] },
  { id: "daily_time_commitment", question: "How much time can you spend daily on indoor farming?", options: ["<1 hour", "1–2 hours", "2–4 hours", "4+ hours"] },
  { id: "interest_in_fish", question: "Are you interested in raising fish?", options: ["No", "Maybe", "Yes"] },
  { id: "pH_monitoring", question: "Do you have tools to monitor pH and nutrients?", options: ["None", "Some tools", "Full monitoring"] },
  { id: "sustainability_interest", question: "How important is sustainability to you?", options: ["Low", "Medium", "High"] },
  { id: "goal_type", question: "What is your indoor farming goal?", options: ["Hobby", "Profit", "Research"] },
  { id: "lighting_setup", question: "What lighting setup do you use?", options: ["Natural only", "Partial LED", "Full LED"] },
  { id: "ventilation_quality", question: "What is the ventilation quality?", options: ["Poor", "Average", "Excellent"] },
];

// --------------------
// Mapping strings → numbers
// --------------------
const optionToNumber = (questionId: string, value: string) => {
  const map: Record<string, Record<string, number>> = {
    avg_temp: { "Cool (18–21°C)": 0, "Moderate (22–25°C)": 1, "Warm (26–29°C)": 2 },
    humidity_control: { "No": 0, "Partial": 1, "Yes": 2 },
    available_space: { "Small (<5 m²)": 0, "Medium (5–15 m²)": 1, "Large (>15 m²)": 2 },
    access_to_water: { "No": 0, "Sometimes": 1, "Always": 2 },
    power_availability: { "No": 0, "Sometimes": 1, "Yes": 2 },
    capital_budget: { "Low": 0, "Medium": 1, "High": 2 },
    tech_comfort_level: { "Low": 0, "Medium": 1, "High": 2 },
    training_experience: { "None": 0, "Some": 1, "Extensive": 2 },
    daily_time_commitment: { "<1 hour": 0, "1–2 hours": 1, "2–4 hours": 2, "4+ hours": 3 },
    interest_in_fish: { "No": 0, "Maybe": 1, "Yes": 2 },
    pH_monitoring: { "None": 0, "Some tools": 1, "Full monitoring": 2 },
    sustainability_interest: { "Low": 0, "Medium": 1, "High": 2 },
    goal_type: { "Hobby": 0, "Profit": 1, "Research": 2 },
    lighting_setup: { "Natural only": 0, "Partial LED": 1, "Full LED": 2 },
    ventilation_quality: { "Poor": 0, "Average": 1, "Excellent": 2 },
  };

  return map[questionId][value];
};

// --------------------
// COMPONENT
// --------------------
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
  const handlePrevStep = () => { if (step > 0) setStep(step - 1); };

  const handleNext = () => {
    if (!answers[current.id]) {
      toast.error("Please select an answer.");
      return;
    }
    if (step + 1 === questions.length) {
      // Convert answers to numeric before sending to Result
      const numericAnswers: Record<string, number> = {};
      for (const key in answers) {
        numericAnswers[key] = optionToNumber(key, answers[key]);
      }
      navigate("/result", { state: numericAnswers });
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
          <h1 className="text-2xl font-bold">{farmingType} Farming Questionnaire</h1>
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
              ) : "Next"}
            </button>
          </div>

          <div className="w-full h-2 bg-muted rounded-full mt-4">
            <div className="h-2 bg-primary rounded-full" style={{ width: `${progress}%` }} />
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
                  Going back will discard your current progress. Do you want to continue?
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
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
