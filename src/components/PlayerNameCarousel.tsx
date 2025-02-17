
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
    <span className="inline-flex min-w-[200px] h-8 items-center overflow-hidden relative">
      <span
        className={cn(
          "absolute inset-0 transition-all duration-500 ease-in-out flex items-center",
          isTransitioning ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
        style={{
          background: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: "bold",
          whiteSpace: "nowrap"
        }}
      >
        {players[currentIndex]}
      </span>
    </span>
  );
};
