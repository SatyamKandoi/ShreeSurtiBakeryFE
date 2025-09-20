import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  {
    src: "/bread.jpg",
    caption: "Buttery Biscuits, Freshly Baked Every Morning",
  },
  {
    src: "/cookies.jpg",
    caption: "Delicate Cookies for Sweet Moments",
  },
  {
    src: "/Cakes-1.jpg",
    caption: "Delicious Cakes – Freshly Made with Love",
  },
];

export default function HeroCarousel() {
  return (
    <div className="relative w-full h-[75vh]">
      <Carousel
        showArrows={true}
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        className="h-full"
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              className="absolute top-0 left-0 h-full w-16 flex items-center justify-center bg-gradient-to-r from-black/30 to-transparent hover:from-black/50 z-10 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              className="absolute top-0 right-0 h-full w-16 flex items-center justify-center bg-gradient-to-l from-black/30 to-transparent hover:from-black/50 z-10 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )
        }
      >
        {images.map((img, index) => (
          <div key={index} className="h-[75vh] relative">
            <img
              src={img.src}
              alt={img.caption}
              className="object-cover w-full h-[75vh]"
            />
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-4xl md:text-6xl font-playfair text-[#FFFEE5] text-center px-6 leading-snug drop-shadow-md">
                {img.caption}
              </h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
