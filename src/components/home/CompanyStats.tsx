
import { gradientTextStyles } from '@/components/PlayerNameCarousel';

export const COMPANY_STATS = [
  { value: "150+", label: "Data points per player" },
  { value: "30+", label: "Leagues covered" },
  { value: "50+", label: "Trusted clients" },
  { value: "10K+", label: "Players analyzed" },
];

export function CompanyStats() {
  return (
    <section className="py-20 w-full">
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
  );
}
