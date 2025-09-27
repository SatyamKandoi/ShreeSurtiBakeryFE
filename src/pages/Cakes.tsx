import { ProductCarousel } from "../components/ProductsCarousel";

export const Cakes = () => {
  // Sample cake collections data
  const birthdayCakes = [
    {
      id: 1,
      name: "Chocolate Delight",
      category: "Birthday",
      price: 1200,
      image: "/Cakes/chocolate-cake.jpg",
    },
    {
      id: 2,
      name: "Vanilla Bliss",
      category: "Birthday",
      price: 1100,
      image: "/Cakes/vanilla-cake.jpg",
    },
    {
      id: 3,
      name: "Red Velvet",
      category: "Birthday",
      price: 1300,
      image: "/Cakes/red-velvet.jpg",
    },
    {
      id: 4,
      name: "Confetti Cake",
      category: "Birthday",
      price: 1250,
      image: "/Cakes/confetti-cake.jpg",
    },
  ];

  const weddingCakes = [
    {
      id: 5,
      name: "Elegant Tiered",
      category: "Wedding",
      price: 5000,
      image: "/Cakes/wedding-tiered.jpg",
    },
    {
      id: 6,
      name: "Floral Fantasy",
      category: "Wedding",
      price: 4500,
      image: "/Cakes/wedding-floral.jpg",
    },
    {
      id: 7,
      name: "Rustic Charm",
      category: "Wedding",
      price: 4200,
      image: "/Cakes/wedding-rustic.jpg",
    },
    {
      id: 8,
      name: "Gold Accent",
      category: "Wedding",
      price: 5500,
      image: "/Cakes/wedding-gold.jpg",
    },
  ];

  const customCakes = [
    {
      id: 9,
      name: "Superhero Theme",
      category: "Custom",
      price: 1800,
      image: "/Cakes/super-hero.jpg",
    },
    {
      id: 10,
      name: "Floral Design",
      category: "Custom",
      price: 2000,
      image: "/Cakes/floral-cake.jpg",
    },
    {
      id: 11,
      name: "Farali Cake",
      category: "Custom",
      price: 1700,
      image: "/Cakes/farali-cake.jpg",
    },
    {
      id: 12,
      name: "Character Cake",
      category: "Custom",
      price: 2200,
      image: "/Cakes/character-cake.jpg",
    },
  ];

  return (
    <section className="bg-[#e8dcce] text-[#000000] min-h-screen flex flex-col justify-start items-center font-inter">
      {/* Hero Section */}
      <div className="w-full relative">
        {/* Background Image with Overlay */}
        <div className="relative h-[70vh] w-full">
          <div className="absolute inset-0 bg-[url('/Cakes/Cakes-Hero.jpg')] bg-cover bg-center bg-no-repeat"></div>
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Hero Content */}
          <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-20">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
              Handcrafted Cakes
            </h1>
            <div className="w-24 h-1 bg-[#c8a97e] mb-6"></div>
            <p className="text-lg md:text-xl text-white max-w-2xl mb-8">
              Indulge in our exquisite selection of freshly baked cakes, crafted
              with premium ingredients and passion in every slice.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-[#e8dcce] rounded-t-[50%]"></div>
      </div>

      {/* Cake Collections */}
      <div className="w-full">
        <ProductCarousel
          title="Birthday Cakes Collection"
          products={birthdayCakes}
        />

        <div className="py-8 w-full flex justify-center">
          <div className="w-1/3 h-0.5 bg-[#c8a97e]"></div>
        </div>

        <ProductCarousel
          title="Wedding Cakes Collection"
          products={weddingCakes}
        />

        <div className="py-8 w-full flex justify-center">
          <div className="w-1/3 h-0.5 bg-[#c8a97e]"></div>
        </div>

        <ProductCarousel title="Custom Cake Ideas" products={customCakes} />
      </div>

      {/* Custom Cake Order CTA */}
      <div className="w-full py-16 my-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-[#5c4f3d]">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            We specialize in creating custom cakes tailored to your specific
            desires and occasions.
          </p>
          <button className="bg-[#663D34] hover:bg-[#8b5e3c] text-white font-semibold py-3 px-10 rounded-lg transition-all">
            Order Custom Cake
          </button>
        </div>
      </div>
    </section>
  );
};
