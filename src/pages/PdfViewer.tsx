import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-background to-secondary p-4">
      {/* Header */}
      <header className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold capitalize">
          {pdfId.replace(/-/g, " ")}
        </h1>
      </header>

      <div className="flex-1 relative">
        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <Spinner loading={true} />
          </div>
        )}

        {/* Error fallback */}
        {error && (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-red-500 font-semibold">Failed to load PDF</p>
              <Button
                className="mt-3"
                onClick={() => {
                  setError(false);
                  setLoading(true);
                }}
              >
                Retry
              </Button>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default PdfViewer;
