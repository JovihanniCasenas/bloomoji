"use client";

import Preview from "@/components/preview/Preview";
import { COLOR_PALETTES } from "@/components/WrapperPicker";
import { decodeConfig } from "@/lib/helpers/shareConfig";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

type BouquetConfig = {
  flowers?: Record<string, number>;
  msg?: string;
  palette?: {
    name: string;
    dome: string;
    left: string;
    right: string;
  };
};

function BouquetContent() {
  const searchParams = useSearchParams();
  const configParam = searchParams.get("c");
  const router = useRouter();

  let flowerCounts = {};
  let selectedPalette = COLOR_PALETTES[0];
  let message = "";

  if (configParam) {
    try {
      const decoded = decodeConfig<BouquetConfig>(configParam);
      flowerCounts = decoded.flowers || {};
      message = decoded.msg || "";
      
      if (decoded.palette) {
        selectedPalette = {
          name: decoded.palette.name,
          domeColor: decoded.palette.dome,
          leftFlapColor: decoded.palette.left,
          rightFlapColor: decoded.palette.right,
        };
      }
    } catch (err) {
      console.error("Failed to decode bouquet config:", err);
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#5D4E37" }}>
            Someone just sent you a bouquet!
          </h1>
          {message && (
            <p className="text-lg mt-4" style={{ color: "#8B7355" }}>
              {message}
            </p>
          )}
        </div>
        <Preview
          flowerCounts={flowerCounts}
          selectedPalette={selectedPalette}
          message={message}
          isReceiver
        />
        <div className="w-full flex justify-center">
            <Button
                variant="contained"
                sx={{
                    marginTop: 4,
                    backgroundColor: "#8B7355",
                    "&:hover": { backgroundColor: "#5D4E37" },
                }}
                onClick={() => router.push("/")}
            >
                Make your own
            </Button>
        </div>
      </div>
    </main>
  );
}

export default function Bouquet() {
  return (
    <Suspense fallback={<div>Loading bouquet...</div>}>
      <BouquetContent />
    </Suspense>
  );
}