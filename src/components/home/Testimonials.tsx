
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const TESTIMONIALS = [
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

export function Testimonials() {
  return (
    <section className="py-20 w-full">
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
  );
}
