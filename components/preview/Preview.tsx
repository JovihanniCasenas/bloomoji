"use client";

import Wrapper from "./Wrapper";
import { ColorPalette } from "../WrapperPicker";
import { Button } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { useState } from "react";

export default function Preview({
  flowerCounts,
  selectedPalette,
  message,
  isReceiver = false,
  randomSeed,
  onRandomize,
}: {
  flowerCounts: Record<string, number>;
  selectedPalette: ColorPalette;
  message: string;
  isReceiver?: boolean;
  randomSeed?: number;
  onRandomize?: (seed: number) => void;
}) {
  const [localRandomSeed, setLocalRandomSeed] = useState(0);
  const currentRandomSeed = randomSeed ?? localRandomSeed;

  const handleRandomize = () => {
    const nextSeed = Math.floor(Math.random() * 10000);
    if (onRandomize) {
      onRandomize(nextSeed);
      return;
    }
    setLocalRandomSeed(nextSeed);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {!isReceiver && (
        <div className="flex justify-center">
            <Button
            variant="outlined"
            sx={{
                borderColor: "#8B7355",
                color: "#5D4E37",
                "&:hover": {
                borderColor: "#5D4E37",
                backgroundColor: "#F5EFE7",
                },
            }}
            startIcon={<ShuffleIcon />}
            onClick={handleRandomize}
            >
            Randomize Arrangement
            </Button>
        </div>
      )}
      <div className="flex justify-center items-center w-full">
        <Wrapper
          flowerCounts={flowerCounts}
          domeColor={selectedPalette.domeColor}
          leftFlapColor={selectedPalette.leftFlapColor}
          rightFlapColor={selectedPalette.rightFlapColor}
          randomSeed={currentRandomSeed}
          cardLetter={message}
        />
      </div>
    </div>
  );
}