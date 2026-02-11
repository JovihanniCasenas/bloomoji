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
}: {
  flowerCounts: Record<string, number>;
  selectedPalette: ColorPalette;
  message: string;
  isReceiver?: boolean;
}) {
  const [randomSeed, setRandomSeed] = useState(0);

  const handleRandomize = () => {
    setRandomSeed(Math.floor(Math.random() * 10000));
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
          randomSeed={randomSeed}
          cardLetter={message}
        />
      </div>
    </div>
  );
}