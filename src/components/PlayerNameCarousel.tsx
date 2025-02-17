
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
      }, 500); // Half of the transition time
    }, 5000);

    return () => clearInterval(interval);
  }, [players.length]);

  return (
    <div className="relative h-8 overflow-hidden inline-block align-bottom">
      <span
        className={cn(
          "absolute left-0 transition-all duration-500 ease-in-out",
          isTransitioning ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
        style={{
          background: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          display: "inline-block",  // Add this to ensure the text is visible
          fontWeight: "bold"        // Make the text bold for better visibility
        }}
      >
        {players[currentIndex]}
      </span>
    </div>
  );
};
