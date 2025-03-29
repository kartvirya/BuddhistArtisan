import { Container } from '../ui/container';

const trustSignals = [
  {
    icon: "fas fa-hands",
    title: "100% Handmade",
    description: "Each piece is carefully crafted by skilled artisans"
  },
  {
    icon: "fas fa-user-friends",
    title: "Local Artisans",
    description: "Supporting traditional craftspeople and their families"
  },
  {
    icon: "fas fa-shipping-fast",
    title: "Free Delivery",
    description: "Worldwide shipping at no extra cost"
  },
  {
    icon: "fas fa-certificate",
    title: "Authenticity",
    description: "Certificate of authenticity with every purchase"
  },
  {
    icon: "fas fa-hand-holding-heart",
    title: "Social Responsibility",
    description: "Supporting monasteries and local schools"
  }
];

const TrustSignals = () => {
  return (
    <section className="py-16 bg-[#F5F5DC]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold mb-2">Why Trust Us</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {trustSignals.map((signal, index) => (
            <div key={index} className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#D4AF37] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${signal.icon} text-[#D4AF37] text-2xl`}></i>
              </div>
              <h3 className="font-serif font-semibold mb-2">{signal.title}</h3>
              <p className="text-gray-600 text-sm">{signal.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustSignals;
