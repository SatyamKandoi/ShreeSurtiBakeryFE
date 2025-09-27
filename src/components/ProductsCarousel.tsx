import React, { useRef } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300; // Adjust per click
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Duplicate products to create infinite loop effect
  const carouselProducts = [...products, ...products];

  return (
    <section className="py-5  w-full relative bg-[#e8dcce]">
      <h2 className="text-3xl md:text-4xl font-serif font-medium mb-8 ml-30 text-[#5c4f3d] relative">
        {" "}
        {title}{" "}
      </h2>

      {/* Container centered with 80% width */}
      <div className="relative mx-auto w-4/5">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-8 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-full z-10 hover:bg-gray-800 transition-colors"
        >
          &#8592;
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-8 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-full z-10 hover:bg-gray-800 transition-colors"
        >
          &#8594;
        </button>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-hidden overflow-y-visible scrollbar-hide py-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {carouselProducts.map((product, idx) => (
            <div
              key={idx}
              className="flex-none w-65 rounded-2xl shadow-lg transform transition-all duration-500 overflow-hidden relative
             bg-gradient-to-b from-[#fff5e6] to-[#e8d8c2] hover:scale-105 hover:shadow-2xl"
            >
              {/* Ribbon */}
              <div className="absolute top-2 left-2 bg-gradient-to-r from-[#f4c150] to-[#e0b040] text-white text-xs font-semibold px-3 py-1 rounded-lg shadow animate-pulse">
                {product.category}
              </div>

              {/* Image with overlay - Changed object-cover to object-contain */}
              <div className="relative w-full h-40 overflow-hidden rounded-t-2xl bg-[#fff8f0]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transform transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors"></div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-bold text-lg  text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-700 font-medium">Rs. {product.price}</p>

                <div className="flex gap-2 mt-2">
                  <button className="flex-1 bg-gradient-to-r from-[#663D34] to-[#8b5e3c] text-white font-semibold py-2 rounded-lg hover:from-[#e0b040] hover:to-[#f4c150] transition-all">
                    Buy Now
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-[#663D34] to-[#8b5e3c] text-white font-semibold py-2 rounded-lg hover:from-[#e0b040] hover:to-[#f4c150] transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
