export default function AboutUs() {
  return (
    <section className="bg-[#eee8dc] text-[#000000] py-16 px-6 md:px-20 font-inter">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Left Image */}
        <div className="relative">
          {/* Chef Hat */}
          <img
            src="/chef-1.png"
            alt="Chef Hat"
            className="absolute -top-20 -left-19 w-50 transform rotate-[-25deg]"
            style={{ transformOrigin: "bottom center" }}
          />

          {/* Main Image */}
          <img
            src="/Surti-Bakery.png"
            alt="Shree Surti Bakery"
            className="rounded-2xl shadow-xl object-cover w-full h-[450px]"
          />

          {/* Since 1995 Tag */}
          <div className="absolute -bottom-6 -right-6 bg-[#663D34] text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg">
            Since 1995
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair mb-6 text-[#000000]">
            Why Choose Us ?
          </h2>
          <p className="text-lg text-[#4E4E4E] leading-relaxed mb-4">
            At <strong>Shree Surti Bakery</strong>, we believe in delivering a
            unique experience with freshly baked products and carefully selected
            ingredients. With a passion for authentic flavors and premium
            quality, we bring you the best of bakery delights.
          </p>
          <p className="text-lg text-[#4E4E4E] leading-relaxed mb-4">
            Our emphasis on{" "}
            <span className="font-semibold">culinary skills</span> and{" "}
            <span className="font-semibold">hygienic preparation</span> ensures
            every piece is crafted to perfection. With attention to detail, we
            closely monitor every stage of the production process to maintain
            the highest standards.
          </p>
          <p className="text-lg text-[#4E4E4E] leading-relaxed">
            Our dedicated staff leaves no stone unturned to put a smile on your
            face with their baked goodness. From soft breads to crispy cookies
            and rich cakes, every bite is a promise of excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
