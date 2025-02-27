
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const BLOG_POSTS = [
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

export function BlogPosts() {
  return (
    <section className="py-20 bg-gray-50 w-full">
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
  );
}
