import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useRef } from "react";

import { App as CapacitorApp } from "@capacitor/app";

import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import QuestionnaireOutdoor from "@/pages/QuestionnaireOutdoor";
import QuestionnaireType from "./pages/QuestionnaireType";
import Result from "./pages/Result";
import Tutorials from "./pages/Tutorials";
import VideoPlayer from "./pages/VideoPlayer";
import PdfPage from "./pages/PdfPage";
import NotFound from "./pages/NotFound";
import ResultOutdoor from "@/pages/ResultOutdoor";
import Crops from "./pages/Crops";

const queryClient = new QueryClient();

/* =========================
   BACK BUTTON HANDLER (FIXED)
========================= */
const BackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastBackPress = useRef(0);

  useEffect(() => {
    let backHandler: any;

    const setupListener = async () => {
      backHandler = await CapacitorApp.addListener("backButton", () => {
        // ✅ If NOT on Home → go back
        if (location.pathname !== "/") {
          navigate(-1);
          return;
        }

        // ✅ If on Home → double press to exit
        const now = Date.now();

        if (now - lastBackPress.current < 2000) {
          CapacitorApp.exitApp();
        } else {
          lastBackPress.current = now;
          alert("Press back again to exit");
        }
      });
    };

    setupListener();

    return () => {
      if (backHandler) backHandler.remove();
    };
  }, [navigate, location.pathname]);

  return null;
};

/* =========================
   MAIN APP
========================= */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* ✅ BACK BUTTON FIX */}
        <BackHandler />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Questionnaire */}
          <Route path="/questionnaire-type" element={<QuestionnaireType />} />
          <Route
            path="/questionnaire"
            element={<Questionnaire farmingType="Indoor" />}
          />
          <Route
            path="/questionnaire-outdoor"
            element={<QuestionnaireOutdoor />}
          />

          {/* Results and Guides */}
          <Route path="/result" element={<Result />} />
          <Route path="/result-outdoor" element={<ResultOutdoor />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/video/:videoId" element={<VideoPlayer />} />

          {/* Crops */}
          <Route path="/crop/:id" element={<Crops />} />

          {/* PDFs */}
          <Route path="/pdfs" element={<PdfPage />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
