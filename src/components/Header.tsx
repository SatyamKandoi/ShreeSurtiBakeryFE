import { useState } from "react";

export type Section = "home" | "gallery" | "products" | "cakes" | "contact";

interface BakeryHeaderProps {
  setActiveSection: (section: Section) => void;
}

export default function BakeryHeader({ setActiveSection }: BakeryHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#ede7d9] text-[#000000] shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 md:px-6">
        {/* Logo */}
        <a
          href="#"
          onClick={() => setActiveSection("home")}
          className="flex items-center space-x-3"
        >
          <img className="h-auto w-35" src="/logo.png" alt="Bakery Logo" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center font-medium text-sm lg:text-base">
          <ul className="flex justify-between w-2/3 max-w-lg">
            <li>
              <button
                onClick={() => setActiveSection("home")}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("gallery")}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("products")}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("cakes")}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Cakes
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("contact")}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>

        {/* Order Button */}
        <button
          onClick={() => setActiveSection("products")}
          className="bg-[#663D34] text-[#FFFEE5] rounded-full font-semibold px-4 py-2 text-sm lg:text-base transition-shadow shadow-md cursor-pointer"
        >
          Order Now
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#000000] hover:bg-[#4B3C2A] transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 transition-opacity duration-300 z-40 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-full h-full bg-white/70 backdrop-blur-lg shadow-xl border-l border-[#EBD58D] transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-[#EBD58D]">
            <h2 className="font-bold text-xl text-[#5c4f3d]">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-2xl text-[#5c4f3d] hover:text-[#D0AC77] transition-colors"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <ul className="flex flex-col p-8 text-xl font-semibold text-[#5c4f3d]">
            {["home", "gallery", "products", "cakes", "contact"].map(
              (section, idx, arr) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      setActiveSection(section as Section);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 hover:text-[#D0AC77] transition-colors duration-300"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                  {/* Add <hr> between items, except after the last one */}
                  {idx !== arr.length - 1 && (
                    <hr className="border-t border my-1 opacity-50" />
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
