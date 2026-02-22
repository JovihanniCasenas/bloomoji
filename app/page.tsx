"use client";

import FlowerPicker from "@/components/FlowerPicker";
import Preview from "@/components/preview/Preview";
import WrapperPicker, { ColorPalette, COLOR_PALETTES } from "@/components/WrapperPicker";
import Message from "@/components/Message";
import { encodeConfig } from "@/lib/helpers/shareConfig";
import { useState } from "react";
import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export default function Home() {
  const [flowerCounts, setFlowerCounts] = useState<Record<string, number>>({});
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(COLOR_PALETTES[0]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const generateShareableLink = () => {
    const config = {
      flowers: flowerCounts,
      palette: {
        name: selectedPalette.name,
        dome: selectedPalette.domeColor,
        left: selectedPalette.leftFlapColor,
        right: selectedPalette.rightFlapColor,
      },
      msg: message,
    };
    
    const encoded = encodeConfig(config);
    const url = `${window.location.origin}/bouquet?c=${encoded}`;
    return url;
  };

  const handleCopyLink = async () => {
    const link = generateShareableLink();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const sections = {
    flowers: "Pick your flowers",
    wrapping: "Pick the wrapping paper color",
    message: "Write your message on the card",
    preview: "Preview your bouquet",
  };
  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-12 px-16 sm:items-start">
      <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
        <div>
          <div className="flex flex-col gap-4 text-4xl font-bold sm:flex-row justify-between w-full">
            Bloomoji
          </div>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            A virtual emoji flower bouquet maker
          </div>
        </div>
        <div className="sm:self-start">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#D4C5B9", color: "var(--foreground)" }}
            startIcon={<RestartAltIcon />}
            onClick={() => {
              setFlowerCounts({});
              setSelectedPalette(COLOR_PALETTES[0]);
              setMessage("");
            }}
          >
            Start Over
          </Button>
        </div>
      </div>

      <div className="h-12"></div>

      <div className="flex flex-col w-full justify-center">
        {Object.entries(sections).map(([key, section], index) => (
          <div
            key={index}
            className="flex flex-col gap-4 text-base font-medium pb-4 mb-4 border-b"
          >
            {section}
            {key === "flowers" && (
              <FlowerPicker
                flowerCounts={flowerCounts}
                onFlowerCountsChange={setFlowerCounts}
              />
            )}
            {key === "wrapping" && <WrapperPicker selectedPalette={selectedPalette} onPaletteChange={setSelectedPalette} />}
            {key === "message" && <Message message={message} onChangedMessage={setMessage} />}
            {key === "preview" && <Preview flowerCounts={flowerCounts} selectedPalette={selectedPalette} message={message} />}
          </div>
        ))}
        
        <div className="flex flex-row gap-4 text-base font-medium pb-4 mb-4 justify-between">
          <div className="text-lg font-semibold">Ready? Share your bouquet!</div>
          <div className="flex gap-2">
            <Button
              id="share-button"
              variant="contained"
              sx={{
                backgroundColor: "#8B7355",
                color: "#FFF8E7",
                "&:hover": { backgroundColor: "#5D4E37" },
              }}
              startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
              onClick={handleCopyLink}
            >
              {copied ? "Link Copied!" : "Copy Shareable Link"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
