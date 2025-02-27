
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PlayerNameCarousel, gradientTextStyles } from '@/components/PlayerNameCarousel';

const FEATURED_PLAYERS = [
  "Erling Haaland",
  "Jude Bellingham",
  "Kylian Mbappé",
  "Victor Osimhen",
  "Marcus Rashford"
];

const COMPANY_STATS = [
  { value: "150+", label: "Data points per player" },
  { value: "30+", label: "Leagues covered" },
  { value: "50+", label: "Trusted clients" },
  { value: "10K+", label: "Players analyzed" },
];

export default function Home() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative pt-16 pb-32 flex flex-col items-center justify-center min-h-[80vh] px-4">
        <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={gradientTextStyles}>
            ScoutSmart
          </h1>
          <button
            onClick={() => navigate('/auth')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            style={{
              background: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
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
          </button>
        </nav>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover the Next Generation of Football Talent
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Advanced analytics and scouting tools powered by cutting-edge AI technology
          </p>
          <PlayerNameCarousel players={FEATURED_PLAYERS} />
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COMPANY_STATS.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-3xl font-bold mb-2" style={gradientTextStyles}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Developments Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Latest Developments</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index}
                className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Coming Soon</h3>
                  <p className="text-gray-600">
                    Stay tuned for exciting updates and developments from our team.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
                  <div>
                    <h3 className="font-semibold">Coming Soon</h3>
                    <p className="text-gray-600">Position, Company</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Testimonials from our satisfied clients will appear here soon."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
