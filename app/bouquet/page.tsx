"use client";

import Preview from "@/components/preview/Preview";
import { COLOR_PALETTES } from "@/components/WrapperPicker";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BouquetContent() {
  const searchParams = useSearchParams();
  const configParam = searchParams.get("c");

  let flowerCounts = {};
  let selectedPalette = COLOR_PALETTES[0];
  let message = "";

  if (configParam) {
    try {
      const decoded = JSON.parse(atob(configParam));
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
      <div className="max-w-2xl w-full">
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