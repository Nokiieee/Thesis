import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import QuestionnaireOutdoor from "@/pages/QuestionnaireOutdoor";
import QuestionnaireType from "./pages/QuestionnaireType";
import Result from "./pages/Result";
import Tutorials from "./pages/Tutorials";
import VideoPlayer from "./pages/VideoPlayer";
import PdfPage from "./pages/PdfPage";
import PdfViewer from "./pages/PdfViewer";
import NotFound from "./pages/NotFound";
import ResultOutdoor from "@/pages/ResultOutdoor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Questionnaire */}
          <Route path="/questionnaire-type" element={<QuestionnaireType />} />
          <Route path="/questionnaire" element={<Questionnaire farmingType="Indoor" />} />
          <Route path="/questionnaire-outdoor" element={<QuestionnaireOutdoor />} />

          {/* Results and Guides */}
          <Route path="/result" element={<Result />} />
          <Route path="/result-outdoor" element={<ResultOutdoor />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/video/:videoId" element={<VideoPlayer />} />

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
