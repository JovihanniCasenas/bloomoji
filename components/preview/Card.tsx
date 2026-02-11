interface CardProps {
  letter?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function Card({
  letter = "",
  backgroundColor = "#F5E6D3",
  textColor = "#333333",
}: CardProps) {
  // Calculate font size based on letter length
  const getFontSize = () => {
    const length = letter.length;
    if (length <= 1) return "32";
    if (length <= 5) return "20";
    if (length <= 10) return "14";
    if (length <= 20) return "10";
    return "8";
  };

  // Calculate if we need multiline text
  const shouldWrap = letter.length > 10;
  const maxWidth = 60; // Width available for text

  return (
    <g transform="rotate(15 190 60)">
      {/* Card shadow for depth */}
      <rect
        x="152"
        y="22"
        width="76"
        height="76"
        rx="4"
        fill="rgba(0, 0, 0, 0.1)"
      />
      
      {/* Main card body */}
      <rect
        x="150"
        y="20"
        width="76"
        height="76"
        rx="4"
        fill={backgroundColor}
        stroke="#E0E0E0"
        strokeWidth="1"
      />

      {/* Small hole at top for string */}
      <ellipse
        cx="188"
        cy="30"
        rx="3"
        ry="3"
        fill="white"
        stroke="#D0D0D0"
        strokeWidth="1"
      />
{shouldWrap ? (
        <foreignObject x="156" y="40" width={maxWidth} height="50">
          <div
            style={{
              fontSize: getFontSize() + "px",
              fontWeight: "500",
              color: textColor,
              fontFamily: "Georgia, serif",
              textAlign: "center",
              wordWrap: "break-word",
              lineHeight: "1.2",
              padding: "0 4px",
            }}
          >
            {letter}
          </div>
        </foreignObject>
      ) : (
        <text
          x="188"
          y="68"
          textAnchor="middle"
          fontSize={getFontSize()}
          fontWeight="500"
          fill={textColor}
          fontFamily="Georgia, serif"
        >
          {letter}
        </text>
      )}

      {/* Letter text */}
      {/* <text
        x="128"
        y="58"
        textAnchor="middle"
        fontSize="12"
        fontWeight="500"
        fill={textColor}
        fontFamily="Georgia, serif"
      >
        {letter}
      </text> */}
    </g>
  );
}
