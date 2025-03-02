
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PlayerNameCarousel, gradientTextStyles } from '@/components/PlayerNameCarousel';

const FEATURED_PLAYERS = [
  "Erling Haaland",
  "Jude Bellingham", 
  "Kylian Mbappé",
  "Victor Osimhen",
  "Marcus Rashford"
];

export function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="relative pt-16 pb-32 flex flex-col items-center justify-center min-h-[80vh] px-4">
      <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={gradientTextStyles}>
          ScoutSmart
        </h1>
        <Link
          to="/auth"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          style={{
            backgroundImage: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 3s ease infinite",
          }}
        >
          <span className="flex items-center text-white font-medium">
            Login/Signup to try ScoutSmart
            <ArrowRight 
              className={`ml-2 transition-all duration-300 transform ${
                isHovered ? 'translate-x-1 opacity-100' : '-translate-x-1 opacity-0'
              }`}
              size={18}
            />
          </span>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover the Next Generation of Football Talent
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Advanced analytics and scouting tools powered by cutting-edge AI technology
        </p>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Find the Next...
        </p>
        <PlayerNameCarousel players={FEATURED_PLAYERS} />
      </div>
    </header>
  );
}
