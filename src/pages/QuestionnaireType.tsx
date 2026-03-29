import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Correct logo imports
import HydroponicsLogo from "@/assets/logos/hydroponics.png";
import AquaponicsLogo from "@/assets/logos/aquaponics.png";
import AeroponicsLogo from "@/assets/logos/aeroponics.png";
import UpoLogo from "@/assets/logos/upo.png";
import AmpalayaLogo from "@/assets/logos/ampalaya.png";
import PatolaLogo from "@/assets/logos/patola.png";
import EggplantLogo from "@/assets/logos/eggplant.png";
import SitawLogo from "@/assets/logos/sitaw.png";
import TomatoLogo from "@/assets/logos/tomato.png";
import SquashLogo from "@/assets/logos/squash.png";
import HotPepperLogo from "@/assets/logos/hot-pepper.png";
import OkraLogo from "@/assets/logos/okra.png";

// Logo arrays
const indoorLogos = [HydroponicsLogo, AquaponicsLogo, AeroponicsLogo];
const outdoorLogos = [
  UpoLogo,
  AmpalayaLogo,
  PatolaLogo,
  EggplantLogo,
  SitawLogo,
  TomatoLogo,
  SquashLogo,
  HotPepperLogo,
  OkraLogo,
];

// Framer Motion variants for fade effect
const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const QuestionnaireType = () => {
  const navigate = useNavigate();

  const [indoorIndex, setIndoorIndex] = useState(0);
  const [outdoorIndex, setOutdoorIndex] = useState(0);

  // Rotate indoor logo every 3 seconds
  useEffect(() => {
    const indoorTimer = setInterval(() => {
      setIndoorIndex((prev) => (prev + 1) % indoorLogos.length);
    }, 3000);
    return () => clearInterval(indoorTimer);
  }, []);

  // Rotate outdoor logo every 3 seconds
  useEffect(() => {
    const outdoorTimer = setInterval(() => {
      setOutdoorIndex((prev) => (prev + 1) % outdoorLogos.length);
    }, 3000);
    return () => clearInterval(outdoorTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <header className="py-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold">Choose Farming Type</h1>
      </header>

      <div className="max-w-md mx-auto space-y-6 mt-8">
       {/* Indoor Farming */}
<Card
  className="p-6 hover:bg-muted transition cursor-pointer flex items-center gap-4 h-32"
  onClick={() => navigate("/questionnaire")}
>
  <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
    <AnimatePresence mode="wait">
      <motion.img
        key={indoorIndex}
        src={indoorLogos[indoorIndex]}
        alt="Indoor Farming"
        className="max-w-full max-h-full object-contain"
        variants={fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      />
    </AnimatePresence>
  </div>
  <div className="flex-1">
    <h2 className="text-xl font-semibold">Indoor Farming</h2>
    <p className="text-muted-foreground">
      Answer questions about your indoor farming environment.
    </p>
  </div>
</Card>

{/* Outdoor Farming */}
<Card
  className="p-6 hover:bg-muted transition cursor-pointer flex items-center gap-4 h-32"
  onClick={() => navigate("/questionnaire-outdoor")}
>
  <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
    <AnimatePresence mode="wait">
      <motion.img
        key={outdoorIndex}
        src={outdoorLogos[outdoorIndex]}
        alt="Outdoor Farming"
        className="max-w-full max-h-full object-contain"
        variants={fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      />
    </AnimatePresence>
  </div>
  <div className="flex-1">
    <h2 className="text-xl font-semibold">Outdoor Farming (Lowland Crops)</h2>
    <p className="text-muted-foreground">
      Evaluate your outdoor environment for lowland crop planting.
    </p>
  </div>
</Card>

      </div>
    </div>
  );
};

export default QuestionnaireType;
