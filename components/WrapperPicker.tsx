"use client";

import { Card, CardContent, Grid } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface ColorPalette {
  name: string;
  domeColor: string;
  leftFlapColor: string;
  rightFlapColor: string;
}

const COLOR_PALETTES: ColorPalette[] = [
  // Cottage Core
  {
    name: "Tan",
    domeColor: "#D4C5B9",
    leftFlapColor: "#C9B8A8",
    rightFlapColor: "#B09F8F",
  },
  {
    name: "Brown",
    domeColor: "#A67C52",
    leftFlapColor: "#8B6F47",
    rightFlapColor: "#6F5436",
  },
  // Barbie Soft Core
  {
    name: "Pink",
    domeColor: "#FFB6C1",
    leftFlapColor: "#FFA6B8",
    rightFlapColor: "#FF96AE",
  },
  {
    name: "Peach",
    domeColor: "#FFD4B8",
    leftFlapColor: "#FFC4A8",
    rightFlapColor: "#FFB498",
  },
  // Alt Core
  {
    name: "Purple",
    domeColor: "#6B5B95",
    leftFlapColor: "#5C4D85",
    rightFlapColor: "#4A3D6F",
  },
  {
    name: "Sage",
    domeColor: "#6B8E7F",
    leftFlapColor: "#5B7E6F",
    rightFlapColor: "#4A6B5C",
  },
  // Bright Colors
  {
    name: "Orange",
    domeColor: "#FF9F6E",
    leftFlapColor: "#FF8F5E",
    rightFlapColor: "#FF7F4E",
  },
  {
    name: "Blue",
    domeColor: "#87CEEB",
    leftFlapColor: "#77BEDB",
    rightFlapColor: "#67AECB",
  },
  {
    name: "Yellow",
    domeColor: "#FFF176",
    leftFlapColor: "#FFE166",
    rightFlapColor: "#FFD156",
  },
];

interface PaletteCardProps {
  palette: ColorPalette;
  isSelected: boolean;
  onSelect: () => void;
}

function PaletteCard({ palette, isSelected, onSelect }: PaletteCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        cursor: "pointer",
        border: isSelected ? "2px solid #5D4E37" : "1px solid #E0E0E0",
        "&:hover": {
          boxShadow: 2,
        },
      }}
      onClick={onSelect}
    >
      <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
        <div className="flex gap-2 mb-2">
          <div
            style={{
              width: 40,
              height: 40,
              backgroundColor: palette.domeColor,
              borderRadius: 4,
              border: "1px solid #D0D0D0",
            }}
          />
          <div
            style={{
              width: 40,
              height: 40,
              backgroundColor: palette.leftFlapColor,
              borderRadius: 4,
              border: "1px solid #D0D0D0",
            }}
          />
          <div
            style={{
              width: 40,
              height: 40,
              backgroundColor: palette.rightFlapColor,
              borderRadius: 4,
              border: "1px solid #D0D0D0",
            }}
          />
        </div>
        <div className="text-sm font-medium text-center flex items-center gap-1">
          {isSelected && <CheckIcon sx={{ fontSize: 16, color: "#5D4E37" }} />}
          {palette.name}
        </div>
      </CardContent>
    </Card>
  );
}

interface WrapperPickerProps {
  selectedPalette: ColorPalette;
  onPaletteChange: (palette: ColorPalette) => void;
}

export default function WrapperPicker({
  selectedPalette,
  onPaletteChange,
}: WrapperPickerProps) {
  return (
    <Grid container spacing={2}>
      {COLOR_PALETTES.map((palette) => (
        <Grid size={{ xs: 6, sm: 4 }} key={palette.name}>
          <PaletteCard
            palette={palette}
            isSelected={
              selectedPalette.domeColor === palette.domeColor &&
              selectedPalette.leftFlapColor === palette.leftFlapColor &&
              selectedPalette.rightFlapColor === palette.rightFlapColor
            }
            onSelect={() => onPaletteChange(palette)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export { COLOR_PALETTES };
export type { ColorPalette };
