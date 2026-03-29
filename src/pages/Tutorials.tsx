import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Import logos
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

type Tutorial = {
  id: string;
  title: string;
  category: string;
  duration: string;
  logo: string;
};

const tutorials: Tutorial[] = [
  { id: "hydroponics", title: "Hydroponics Guide", category: "Indoor Farming", duration: "8:45", logo: HydroponicsLogo },
  { id: "aquaponics", title: "Aquaponics System Setup", category: "Indoor Farming", duration: "10:20", logo: AquaponicsLogo },
  { id: "aeroponics", title: "Aeroponics Advanced", category: "Indoor Farming", duration: "12:15", logo: AeroponicsLogo },
  { id: "upo", title: "Growing Upo (Bottle Gourd)", category: "Lowland Crops", duration: "6:30", logo: UpoLogo },
  { id: "ampalaya", title: "Ampalaya (Bitter Gourd) Farming", category: "Lowland Crops", duration: "7:15", logo: AmpalayaLogo },
  { id: "patola", title: "Patola (Sponge Gourd) Guide", category: "Lowland Crops", duration: "6:45", logo: PatolaLogo },
  { id: "eggplant", title: "Eggplant Cultivation", category: "Lowland Crops", duration: "8:00", logo: EggplantLogo },
  { id: "sitaw", title: "Sitaw (String Beans) Growing", category: "Lowland Crops", duration: "7:30", logo: SitawLogo },
  { id: "tomato", title: "Tomato Farming Basics", category: "Lowland Crops", duration: "9:20", logo: TomatoLogo },
  { id: "squash", title: "Squash Growing Guide", category: "Lowland Crops", duration: "7:45", logo: SquashLogo },
  { id: "hot-pepper", title: "Hot Pepper Cultivation", category: "Lowland Crops", duration: "8:10", logo: HotPepperLogo },
  { id: "okra", title: "Okra Farming Essentials", category: "Lowland Crops", duration: "6:55", logo: OkraLogo },
];

const Tutorials = () => {
  const navigate = useNavigate();

  const indoorTutorials = tutorials.filter(t => t.category === "Indoor Farming");
  const outdoorTutorials = tutorials.filter(t => t.category === "Lowland Crops");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Video Tutorials</h1>
            <p className="text-muted-foreground">All videos work offline</p>
          </div>
        </header>

        <main className="flex flex-col gap-8 overflow-y-auto" style={{ height: "calc(100vh - 6rem)" }}>
          {/* Indoor Farming */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Indoor Farming Methods</h2>
            <div className="space-y-4">
              {indoorTutorials.map((tutorial) => (
                <ZoomCard
                  key={tutorial.id}
                  tutorial={tutorial}
                  onClick={() => navigate(`/video/${tutorial.id}`)}
                />
              ))}
            </div>
          </section>

          {/* Lowland Crops */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Lowland Crops</h2>
            <div className="space-y-4">
              {outdoorTutorials.map((tutorial) => (
                <ZoomCard
                  key={tutorial.id}
                  tutorial={tutorial}
                  onClick={() => navigate(`/video/${tutorial.id}`)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

// ZoomCard component with scroll zoom + blur effect
type ZoomCardProps = {
  tutorial: Tutorial;
  onClick: () => void;
};

const ZoomCard = ({ tutorial, onClick }: ZoomCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      animate={{
        scale: isInView ? 1 : 0.85,
        filter: isInView ? "blur(0px)" : "blur(4px)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 25 }}
      onClick={onClick}
    >
      <Card className="p-4 cursor-pointer hover:-translate-y-2 hover:shadow-lg hover:bg-accent/5 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-125">
            <img src={tutorial.logo} alt={`${tutorial.title} Logo`} className="w-20 h-20 object-contain" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{tutorial.title}</h3>
            <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Tutorials;
