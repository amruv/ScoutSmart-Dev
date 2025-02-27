
export const CLIENT_LOGOS = [
  { name: "Client 1", logo: "placeholder.svg" },
  { name: "Client 2", logo: "placeholder.svg" },
  { name: "Client 3", logo: "placeholder.svg" },
  { name: "Client 4", logo: "placeholder.svg" },
  { name: "Client 5", logo: "placeholder.svg" },
  { name: "Client 6", logo: "placeholder.svg" },
];

export function ClientLogos() {
  return (
    <section className="py-16 bg-gray-50 w-full">
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
  );
}
