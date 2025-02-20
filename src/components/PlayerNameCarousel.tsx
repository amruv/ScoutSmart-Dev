
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PlayerNameCarouselProps {
  players: string[];
}

export const PlayerNameCarousel = ({ players }: PlayerNameCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % players.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [players.length]);

  return (
    <div className="inline-flex min-w-[300px] h-16 items-center justify-center overflow-hidden relative">
      <span
        className={cn(
          "absolute transition-all duration-500 ease-in-out flex items-center text-4xl font-bold",
          isTransitioning ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
        style={{
          backgroundImage: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 3s ease infinite",
          whiteSpace: "nowrap"
        }}
      >
        {players[currentIndex]}
      </span>
    </div>
  );
};
