// src/pages/PdfPage.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Browser } from "@capacitor/browser";

type PdfItem = {
  id: string;
  title: string;
  category: string;
  logo: string;
  fileUrl: string;
};

const BASE_URL = "https://thesis-ljvg.onrender.com";

const pdfs: PdfItem[] = [
  {
    id: "hydroponics",
    title: "Hydroponics Guide",
    category: "Indoor Farming",
    logo: "/logos/hydroponics_p.png",
    fileUrl: `${BASE_URL}/pdfs/hydroponics.pdf`,
  },
  {
    id: "aquaponics",
    title: "Aquaponics System Setup",
    category: "Indoor Farming",
    logo: "/logos/aquaponics_p.png",
    fileUrl: `${BASE_URL}/pdfs/aquaponics.pdf`,
  },
  {
    id: "aeroponics",
    title: "Aeroponics Advanced",
    category: "Indoor Farming",
    logo: "/logos/aeroponics_p.png",
    fileUrl: `${BASE_URL}/pdfs/aeroponics.pdf`,
  },
  {
    id: "upo",
    title: "Growing Upo (Bottle Gourd)",
    category: "Lowland Crops",
    logo: "/logos/upo_p.png",
    fileUrl: `${BASE_URL}/pdfs/upo.pdf`,
  },
  {
    id: "ampalaya",
    title: "Ampalaya (Bitter Gourd) Farming",
    category: "Lowland Crops",
    logo: "/logos/ampalaya_p.png",
    fileUrl: `${BASE_URL}/pdfs/ampalaya.pdf`,
  },
  {
    id: "patola",
    title: "Patola (Sponge Gourd) Guide",
    category: "Lowland Crops",
    logo: "/logos/patola_p.png",
    fileUrl: `${BASE_URL}/pdfs/patola.pdf`,
  },
  {
    id: "eggplant",
    title: "Eggplant Cultivation",
    category: "Lowland Crops",
    logo: "/logos/eggplant_p.png",
    fileUrl: `${BASE_URL}/pdfs/eggplant.pdf`,
  },
  {
    id: "sitaw",
    title: "Sitaw (String Beans) Growing",
    category: "Lowland Crops",
    logo: "/logos/sitaw_p.png",
    fileUrl: `${BASE_URL}/pdfs/sitaw.pdf`,
  },
  {
    id: "tomato",
    title: "Tomato Farming Basics",
    category: "Lowland Crops",
    logo: "/logos/tomato_p.png",
    fileUrl: `${BASE_URL}/pdfs/tomato.pdf`,
  },
  {
    id: "squash",
    title: "Squash Growing Guide",
    category: "Lowland Crops",
    logo: "/logos/squash_p.png",
    fileUrl: `${BASE_URL}/pdfs/squash.pdf`,
  },
  {
    id: "hot-pepper",
    title: "Hot Pepper Cultivation",
    category: "Lowland Crops",
    logo: "/logos/hot-pepper_p.png",
    fileUrl: `${BASE_URL}/pdfs/hot-pepper.pdf`,
  },
  {
    id: "okra",
    title: "Okra Farming Essentials",
    category: "Lowland Crops",
    logo: "/logos/okra_p.png",
    fileUrl: `${BASE_URL}/pdfs/okra.pdf`,
  },
];

const PdfPage = () => {
  const navigate = useNavigate();

  const indoorPdfs = pdfs.filter((pdf) => pdf.category === "Indoor Farming");
  const outdoorPdfs = pdfs.filter((pdf) => pdf.category === "Lowland Crops");

  const handleDownload = (fileUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = title + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = async (fileUrl: string) => {
    await Browser.open({ url: fileUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">PDF Guides</h1>
            <p className="text-muted-foreground">Offline farming guides</p>
          </div>
        </header>

        <main
          className="flex flex-col gap-8 overflow-y-auto"
          style={{ height: "calc(100vh - 6rem)" }}
        >
          {/* Indoor Farming PDFs */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Indoor Farming Methods
            </h2>
            <div className="space-y-4">
              {indoorPdfs.map((pdf) => (
                <ZoomCard
                  key={pdf.id}
                  pdf={pdf}
                  onDownload={() => handleDownload(pdf.fileUrl, pdf.title)}
                  onView={() => handleView(pdf.fileUrl)}
                />
              ))}
            </div>
          </section>

          {/* Lowland Crops PDFs */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Lowland Crops</h2>
            <div className="space-y-4">
              {outdoorPdfs.map((pdf) => (
                <ZoomCard
                  key={pdf.id}
                  pdf={pdf}
                  onDownload={() => handleDownload(pdf.fileUrl, pdf.title)}
                  onView={() => handleView(pdf.fileUrl)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

type ZoomCardProps = {
  pdf: PdfItem;
  onDownload: () => void;
  onView: () => void;
};

const ZoomCard = ({ pdf, onDownload, onView }: ZoomCardProps) => {
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
    >
      <Card className="p-4 flex items-center gap-4 shadow-lg bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* Logo */}
        <div className="w-24 h-24 flex items-center justify-center flex-shrink-0">
          <img
            src={pdf.logo}
            alt={pdf.title}
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="font-semibold">{pdf.title}</h3>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            style={{ backgroundColor: "#73AF6F", color: "white" }}
            onClick={onView}
          >
            View
          </Button>
          <Button
            style={{ backgroundColor: "#628141", color: "white" }}
            onClick={onDownload}
          >
            Download
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default PdfPage;
