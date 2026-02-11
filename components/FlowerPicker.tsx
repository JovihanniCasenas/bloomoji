"use client";

import { Card, CardContent, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FLOWERS } from "@/lib/helpers/flowers";
import { useState } from "react";

function FlowerCard({
  flower,
  count,
  onIncrement,
  onDecrement,
}: {
  flower: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <Card variant="outlined">
      <CardContent className="flex flex-row items-center justify-center gap-2">
        <IconButton
          onClick={onDecrement}
          disabled={count === 0}
          sx={{
            backgroundColor: "#8B7355",
            color: "#FFF8E7",
            height: 28,
            width: 28,
            "&:hover": { backgroundColor: "#5D4E37" },
            "&:disabled": { backgroundColor: "#D4C5B9", color: "#A39588" },
          }}
        >
          <RemoveIcon />
        </IconButton>
        <div className="flex flex-col items-center gap-1">
          <div className="text-4xl">{flower}</div>
        </div>
        <IconButton
          onClick={onIncrement}
          sx={{
            backgroundColor: "#8B7355",
            color: "#FFF8E7",
            height: 28,
            width: 28,
            "&:hover": { backgroundColor: "#5D4E37" },
          }}
        >
          <AddIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default function FlowerPicker({
  flowerCounts,
  onFlowerCountsChange,
}: {
  flowerCounts: Record<string, number>;
  onFlowerCountsChange: (counts: Record<string, number>) => void;
}) {
  const handleIncrement = (name: string) => {
    onFlowerCountsChange({
      ...flowerCounts,
      [name]: (flowerCounts[name] || 0) + 1,
    });
  };

  const handleDecrement = (name: string) => {
    onFlowerCountsChange({
      ...flowerCounts,
      [name]: Math.max(0, (flowerCounts[name] || 0) - 1),
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        {Object.entries(FLOWERS).map(([name, emoji]) => (
          <Grid size={{ xs: 6, sm: 3 }} key={name}>
            <FlowerCard
              flower={emoji}
              count={flowerCounts[name] || 0}
              onIncrement={() => handleIncrement(name)}
              onDecrement={() => handleDecrement(name)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
