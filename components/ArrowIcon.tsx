type ArrowIconProps = {
  direction?: "left" | "right" | "down";
};

export function ArrowIcon({ direction = "right" }: ArrowIconProps) {
  const rotation = direction === "left" ? 180 : direction === "down" ? 90 : 0;

  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 32 16"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M1 8h28M22 1l7 7-7 7" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
