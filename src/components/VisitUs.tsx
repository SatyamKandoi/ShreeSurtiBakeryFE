export default function VisitUs() {
  return (
    <section className="bg-[#e8dcce] py-16 px-6 md:px-20 font-inter">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair mb-4 text-[#000000]">
            Visit <span className="text-[#000000]">Us at</span>
          </h2>
          <p className="text-lg text-[#4E4E4E] mb-6 leading-relaxed">
            Step into the world of freshly baked goodness! Whether it’s the rich
            aroma of our breads or the sweetness of our cakes, we promise an
            experience that’s as warm as our ovens.
          </p>

          {/* Address and Contact */}
          <div className="space-y-4 text-lg text-[#4E4E4E]">
            <p>
              <span className="font-semibold text-[#000000]">Address:</span>{" "}
              Mahajan Ln, Raopura, Vadodara, Gujarat 390001
            </p>
            <p>
              <span className="font-semibold text-[#000000]">Phone:</span> +91
              98765 43210
            </p>
            <p>
              <span className="font-semibold text-[#000000]">Email:</span>{" "}
              info@shreesurtibakery.com
            </p>
          </div>

          {/* Open in Google Maps Button */}
          <div className="mt-6">
            <a
              href="https://www.google.com/maps?ll=22.303409,73.202464&z=17&t=m&hl=en&gl=IN&mapclient=embed&cid=17676168731690546177"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#663D34] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#b88a5c] transition"
            >
              Find Us on Google Maps
            </a>
          </div>
        </div>

        {/* Right: Google Map */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-[#D0AC77]/30">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3691.375000462865!2d73.19339402370794!3d22.30165316477713!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf5f0418024b%3A0xf54e5dcf22483401!2sShree%20Surti%20Bakery!5e0!3m2!1sen!2sin!4v1756540893300!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
