export default function BakeryFooter() {
  return (
    <footer className="bg-[#eee8dc] text-[#4E4E4E] shadow-md pt-12 pb-6 font-inter">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img src="/logo.png" alt="Bakery Logo" className="w-32 mb-4" />
          <p className="text-sm leading-relaxed">
            Shree Surti Bakery – delivering freshly baked delights with
            authentic recipes and the finest ingredients. Experience the perfect
            blend of taste and tradition.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#663D34]">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#D0AC77]">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#D0AC77]">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#D0AC77]">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#D0AC77]">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#663D34]">
            Contact Us
          </h4>
          <p className="text-sm">📍 Mandvi, Gujarat, India</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉️ info@shreesurtibakery.com</p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#663D34]">
            Stay Updated
          </h4>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D0AC77]"
            />
            <button
              type="submit"
              className="bg-[#663D34] text-[#FFFEE5] px-6 py-2 rounded-full hover:bg-[#D0AC77] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider & Bottom Text */}
      <div className="mt-8 border-t border-[#D0AC77] pt-4 text-center text-sm text-gray-700">
        © {new Date().getFullYear()} Shree Surti Bakery. All rights reserved.
      </div>
    </footer>
  );
}
