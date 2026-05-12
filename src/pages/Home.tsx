import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

import AgriLogo from "@/assets/logos/agri_logo.png";
import MethodLogo from "@/assets/logos/farming_method.png";
import TutorialsLogo from "@/assets/logos/tutorials_logo.png";
import PdfLogo from "@/assets/logos/pdf_logo.png";

const slides = [
  {
    id: "method",
    title: "Discover Your Perfect Farming Method",
    description:
      "Answer a few questions about your environment, and we’ll recommend the best farming approach for you.",
    logo: MethodLogo,
    buttonText: "Start Questionnaire",
    route: "/questionnaire-type",
  },
  {
    id: "tutorials",
    title: "Video Tutorials",
    description: "Explore our collection of offline farming tutorials.",
    logo: TutorialsLogo,
    buttonText: "View Tutorials",
    route: "/tutorials",
  },
  {
    id: "pdfs",
    title: "PDF Guides",
    description: "View PDF farming guides and best practices.",
    logo: PdfLogo,
    buttonText: "PDF Guides",
    route: "/pdfs",
  },
];

const HEADER_HEIGHT = 160;

const Home = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(() => {
    return sessionStorage.getItem("hasLoaded") ? false : true;
  });

  /* =========================
     LOADING SCREEN
  ========================== */
  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("hasLoaded", "true");
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);

  /* =========================
     GLOBAL 1-MINUTE INTERVAL
  ========================== */
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔄 Global 1-minute background task running");

      // Example 1: warm backend (avoid cold start)
      fetch("https://thesis-ljvg.onrender.com/ping").catch(() => {});

      // Example 2: preload or refresh cached data
      // localStorage.setItem("lastSync", Date.now().toString());

      // Example 3: prefetch recommendation if needed
      // fetch("https://thesis-ljvg.onrender.com/predict-indoor")
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     ACTIVE SLIDE DETECTION
  ========================== */
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const slidesElements = containerRef.current.children;
      let closestIndex = 0;
      let closestDistance = Infinity;

      const centerY = HEADER_HEIGHT + (window.innerHeight - HEADER_HEIGHT) / 2;

      Array.from(slidesElements).forEach((child, index) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - centerY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderSlide = (slide: (typeof slides)[number], index: number) => {
    const isActive = index === activeIndex;
    const blur = isActive ? 0 : 4;

    return (
      <motion.div
        key={slide.id}
        id={slide.id}
        className="w-full flex justify-center snap-start"
        style={{
          filter: `blur(${blur}px)`,
          transition: "filter 0.3s ease",
        }}
      >
        <Card className="w-80 flex flex-col items-center justify-center p-6 shadow-lg">
          <img src={slide.logo} className="w-40 h-40 object-contain mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-center">
            {slide.title}
          </h2>
          <p className="text-muted-foreground mb-4 text-center">
            {slide.description}
          </p>
          <Button
            className="w-full text-white py-4 text-lg"
            style={{ backgroundColor: "#628141" }}
            onClick={() => navigate(slide.route)}
          >
            {slide.buttonText}
          </Button>
        </Card>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary">
        <img
          src={AgriLogo}
          alt="Logo"
          className="w-40 h-40 mb-4 animate-bounce"
        />
        <h1 className="text-4xl font-bold text-foreground mb-2">AgriGuide</h1>
        <p className="text-muted-foreground text-center">
          Your Smart Farming Assistant
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col items-center relative">
      {/* Header */}
      <div
        className="fixed top-0 left-0 w-full bg-gradient-to-b from-background to-secondary z-20 flex flex-col items-center py-6 shadow-md"
        style={{ height: HEADER_HEIGHT }}
      >
        <img src={AgriLogo} className="w-20 h-20 mb-0" />
        <h1 className="text-3xl font-bold text-foreground">AgriGuide</h1>
        <p className="text-muted-foreground -mt-1">
          Your Smart Farming Assistant
        </p>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-48 bg-gradient-to-b from-background to-secondary rounded-r-xl shadow-xl z-40 flex flex-col"
      >
        <div className="flex flex-col items-center py-6">
          <img src={AgriLogo} className="w-20 h-20 mb-2" />
          <h2 className="text-xl font-bold text-foreground">AgriGuide</h2>
          <p className="text-sm text-muted-foreground">
            Smart Farming Assistant
          </p>
        </div>
      </motion.aside>

      {/* Slides */}
      <div
        ref={containerRef}
        className="flex flex-col gap-16 w-full max-w-3xl mt-[180px] px-4 pb-16 overflow-y-auto snap-y snap-mandatory"
        style={{ paddingTop: HEADER_HEIGHT / 2 }}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </div>
    </div>
  );
};

export default Home;
