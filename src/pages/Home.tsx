
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { PlayerNameCarousel, gradientTextStyles } from '@/components/PlayerNameCarousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const FEATURED_PLAYERS = [
  "Erling Haaland",
  "Jude Bellingham",
  "Kylian Mbappé",
  "Victor Osimhen",
  "Marcus Rashford"
];

const CLIENT_LOGOS = [
  { name: "Client 1", logo: "placeholder.svg" },
  { name: "Client 2", logo: "placeholder.svg" },
  { name: "Client 3", logo: "placeholder.svg" },
  { name: "Client 4", logo: "placeholder.svg" },
  { name: "Client 5", logo: "placeholder.svg" },
  { name: "Client 6", logo: "placeholder.svg" },
];

const COMPANY_STATS = [
  { value: "150+", label: "Data points per player" },
  { value: "30+", label: "Leagues covered" },
  { value: "50+", label: "Trusted clients" },
  { value: "10K+", label: "Players analyzed" },
];

const BLOG_POSTS = [
  {
    title: "Advanced Player Analytics",
    excerpt: "Discover how our AI-powered analytics are revolutionizing scouting.",
    date: "2024-02-20",
  },
  {
    title: "Scouting Network Expansion",
    excerpt: "We're now covering more leagues and tournaments than ever before.",
    date: "2024-02-15",
  },
  {
    title: "New Partnership Announcement",
    excerpt: "Exciting collaboration with leading football academies.",
    date: "2024-02-10",
  },
];

const TESTIMONIALS = [
  {
    quote: "ScoutSmart has transformed our scouting process completely.",
    author: "John Smith",
    position: "Head Scout",
    company: "Premier League Club",
  },
  {
    quote: "The depth of data analysis is unprecedented.",
    author: "Maria Garcia",
    position: "Technical Director",
    company: "La Liga Club",
  },
  {
    quote: "A game-changer for modern football scouting.",
    author: "Thomas Mueller",
    position: "Academy Director",
    company: "Bundesliga Club",
  },
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

      {/* Client Logos Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-12">Trusted by Leading Clubs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {CLIENT_LOGOS.map((client, index) => (
              <div 
                key={index}
                className="aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-20 h-20 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
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

      {/* Blog Posts Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Latest Updates</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {BLOG_POSTS.map((post, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <span className="text-sm text-gray-400">{post.date}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="mb-4">
                      <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                      <div>
                        <h3 className="font-semibold">{testimonial.author}</h3>
                        <p className="text-gray-600">{testimonial.position}</p>
                        <p className="text-gray-400">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
