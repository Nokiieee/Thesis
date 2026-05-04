import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import Spinner from "./Spinner";

const PdfViewer = () => {
  const { pdfId } = useParams<{ pdfId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!pdfId) return <p>PDF not found</p>;

  const BASE_URL = "https://thesis-ljvg.onrender.com";
  const fileUrl = `${BASE_URL}/pdfs/${pdfId}.pdf`;

  const handleOpenExternal = () => {
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-background to-secondary p-4">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold capitalize">
            {pdfId.replace(/-/g, " ")}
          </h1>
        </div>

        {/* OPEN IN BROWSER BUTTON (important for mobile) */}
        <Button onClick={handleOpenExternal} variant="outline">
          <ExternalLink className="w-4 h-4 mr-2" />
          Open
        </Button>
      </header>

      {/* CONTENT */}
      <div className="flex-1 relative">
        {/* LOADING */}
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <Spinner loading={true} />
          </div>
        )}

        {/* ERROR (MOBILE FALLBACK) */}
        {error && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-red-500 font-semibold mb-3">
              PDF preview not supported on this device
            </p>

            <Button onClick={handleOpenExternal}>Open PDF in Browser</Button>
          </div>
        )}

        {/* PDF VIEWER */}
        {!error && (
          <iframe
            src={fileUrl}
            className="w-full h-full border rounded-lg"
            title={pdfId}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
