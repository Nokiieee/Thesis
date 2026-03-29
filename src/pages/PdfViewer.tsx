import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PdfViewer = () => {
  const { pdfId } = useParams<{ pdfId: string }>();
  const navigate = useNavigate();

  if (!pdfId) return <p>PDF not found</p>;

  const fileUrl = `/pdfs/${pdfId}.pdf`; // public folder path

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <header className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold">{pdfId.replace(/-/g, " ")}</h1>
      </header>

      {/* FIXED SCROLL ISSUE HERE */}
      <div className="min-h-[80vh]">
        <iframe
          src={fileUrl}
          className="w-full min-h-screen border rounded-lg"
          title={pdfId}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
