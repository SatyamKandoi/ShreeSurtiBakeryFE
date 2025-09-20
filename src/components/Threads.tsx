export default function ThreadsGrid() {
  const posts = [
    { type: "video", src: "/Cake.mp4", alt: "Baking in Action" },
    { type: "video", src: "/Cake-2.mp4", alt: "Baking in Action" },
    { type: "video", src: "/Cake-3.mp4", alt: "Delicious Cookies" },
    { type: "image", src: "/Cake-4.png", alt: "Tasty Cakes" },
  ];

  return (
    <section className="bg-[#e8dcce] py-16 px-6 md:px-20 font-inter">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <div className="flex items-center space-x-4 mb-4 justify-center">
          <h2 className="text-4xl md:text-5xl font-playfair">
            Moments from Our Kitchen
            <p className="text-lg text-[#4E4E4E] mt-4">
              A glimpse of our freshly baked delights and behind-the-scenes
              magic.
            </p>
          </h2>
          <img
            src="/bake.png"
            style={{ transformOrigin: "bottom center", height: "120px" }}
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((item, index) => (
          <div
            key={index}
            className="relative bg-black rounded-lg overflow-hidden aspect-square flex items-center justify-center"
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-contain bg-black"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
