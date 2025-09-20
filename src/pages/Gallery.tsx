export const GalleryPage = () => {
  const images = [
    "/Gallery/image-1.png",
    "/Gallery/image-2.png",
    "/Gallery/image-3.png",
    "/Gallery/image-4.png",
    "/Gallery/image-5.png",
    "/Gallery/image-6.png",
    "/Gallery/image-7.png",
    "/Gallery/image-8.png",
    "/Gallery/image-9.png",
    "/Gallery/image-10.png",
    "/Gallery/image-11.png",
    "/Gallery/image-12.png",
  ];

  return (
    <section className="bg-[#e8dcce] text-[#000000] py-16 px-6 md:px-20 font-inter min-h-screen">
      <h2 className="text-4xl mt-10 md:text-5xl font-playfair mb-10 text-center">
        Gallery
      </h2>

      <div className="max-w-6xl mx-auto mt-10">
        {/* Instagram-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full pb-[100%] overflow-hidden rounded-lg"
            >
              <img
                src={img}
                alt={`Gallery Image ${idx + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
