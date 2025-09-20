export const FeaturedVideo = () => {
  return (
    <section className="bg-[#eee8dc] py-20 px-6 md:px-20 font-inter">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-6">
          Our Featured Videos
        </h2>

        {/* Responsive Video Container */}
        <div className="w-full relative" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/YL-hfY-jsDo"
            title="વડોદરા ની સૌથી જૂની બેકરી , પાર્ટ ૨ સુરતી બેકરી, રાવપુરા વડોદરા"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};
