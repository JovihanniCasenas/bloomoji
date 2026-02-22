import Card from "./Card";
import { FLOWERS } from "@/lib/helpers/flowers";

interface WrapperProps {
  domeColor?: string;
  leftFlapColor?: string;
  rightFlapColor?: string;
  cardLetter?: string;
  flowerCounts?: Record<string, number>;
  randomSeed?: number;
}

export default function Wrapper({
  domeColor = "#D4C5B9",
  leftFlapColor = "#C9B8A8",
  rightFlapColor = "#B09F8F",
  cardLetter = "",
  flowerCounts = {},
  randomSeed = 0,
}: WrapperProps) {
  // Seeded random number generator for consistent positions and ordering
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Generate array of flowers to display based on counts
  const flowersToDisplay: string[] = [];
  Object.entries(flowerCounts).forEach(([name, count]) => {
    const emoji = FLOWERS[name as keyof typeof FLOWERS];
    if (emoji && count > 0) {
      for (let i = 0; i < count; i++) {
        flowersToDisplay.push(emoji);
      }
    }
  });

  // Shuffle flower render order so layering (top/bottom) is also randomized
  const shuffledFlowersToDisplay = [...flowersToDisplay];
  for (let i = shuffledFlowersToDisplay.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(seededRandom(randomSeed + i * 97) * (i + 1));
    [shuffledFlowersToDisplay[i], shuffledFlowersToDisplay[randomIndex]] = [
      shuffledFlowersToDisplay[randomIndex],
      shuffledFlowersToDisplay[i],
    ];
  }

  // Check if a point is inside the back panel area (including the edge)
  const isInsideBackPanel = (x: number, y: number): boolean => {
    // The back panel includes:
    // 1. Top dome: curves from (20,110) through (130,30) to (240,110)
    // 2. Extends down to where flaps meet at y≈160
    
    // Left and right boundaries narrow as we go down
    const centerX = 130;
    
    // Top section (dome area): y from 35 to 110
    if (y >= 40 && y <= 110) {
      if (x < 30 || x > 230) return false;
      
      const topY = 35;
      const bottomY = 110;
      const halfWidth = 110;
      
      const distFromCenter = Math.abs(x - centerX);
      const minYAtX = topY + (bottomY - topY) * Math.pow(distFromCenter / halfWidth, 2);
      
      return y >= minYAtX;
    }
    
    // Middle section (where flaps meet): y from 110 to 160
    if (y > 110 && y <= 160) {
      // The wrapper narrows from 210px wide at y=110 to about 140px wide at y=160
      const widthAtY = 210 - ((y - 110) / 50) * 70;
      const minX = centerX - widthAtY / 2;
      const maxX = centerX + widthAtY / 2;
      
      return x >= minX && x <= maxX;
    }
    
    return false;
  };

  // Generate deterministic positions for flowers within the back panel
  const getFlowerPosition = (index: number, total: number) => {
    let x, y, attempts = 0;
    const maxAttempts = 50;
    const seed = (index + randomSeed) * 1000; // Use index and randomSeed as base seed
    
    // Keep trying positions until we find one inside the back panel
    do {
      x = 30 + seededRandom(seed + attempts * 3) * 200; // Seeded x between 30 and 230
      y = 40 + seededRandom(seed + attempts * 3 + 1) * 120; // Seeded y between 40 and 160
      attempts++;
    } while (!isInsideBackPanel(x, y) && attempts < maxAttempts);
    
    // Fallback if we couldn't find a good position
    if (attempts >= maxAttempts) {
      x = 130;
      y = 80;
    }
    
    const rotation = (seededRandom(seed + 2) - 0.5) * 30; // Seeded rotation between -15 and 15 degrees
    
    return { x, y, rotation };
  };

  return (
    <svg
      width="260"
      height="420"
      viewBox="0 0 260 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wrapper back panel */}
      <path
        d="M20 110
       Q20 40 130 30
       Q240 40 240 110
       L170 370
       Q130 410 90 370
       Z"
        fill={domeColor}
      />

      {/* Left flap */}
      <path
        d="M20 110
       Q60 150 130 160
       L130 410
       Q110 395 90 370
       Z"
        fill={leftFlapColor}
      />

      {/* Right flap */}
      <path
        d="M240 110
       Q200 150 130 160
       L130 410
       Q150 395 170 370
       Z"
        fill={rightFlapColor}
      />

      {/* Heart decoration */}
      <path
        d="M130 70
       C120 55, 95 55, 95 75
       C95 95, 120 105, 130 120
       C140 105, 165 95, 165 75
       C165 55, 140 55, 130 70
       Z"
        fill="#FFF8E7"
      />

      {/* Render flowers on top of everything */}
      {shuffledFlowersToDisplay.map((emoji, index) => {
        const { x, y, rotation } = getFlowerPosition(index, shuffledFlowersToDisplay.length);
        const size = 80;
        const half = size / 2;
        return (
          <g key={`flower-${index}`} transform={`rotate(${rotation}, ${x}, ${y})`}>
            <foreignObject x={x - half} y={y - half} width={size} height={size}>
              <div
                style={{
                  fontSize: "80px",
                  lineHeight: "80px",
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {emoji}
              </div>
            </foreignObject>
          </g>
        );
      })}

      <Card letter={cardLetter} />
    </svg>
  );
}
