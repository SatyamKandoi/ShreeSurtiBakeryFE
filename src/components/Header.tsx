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
        <button className="bg-[#663D34] text-[#FFFEE5] rounded-full font-semibold px-4 py-2 text-sm lg:text-base hover:bg-[#EBD58D] transition-shadow shadow-md">
          Order Now
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#000000] hover:bg-[#4B3C2A]"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFFEE5] shadow-md border-t border-[#EBD58D]">
          <ul className="flex flex-col space-y-4 p-4 text-lg font-medium">
            <li>
              <button
                onClick={() => {
                  setActiveSection("home");
                  setIsMenuOpen(false);
                }}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection("gallery");
                  setIsMenuOpen(false);
                }}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection("products");
                  setIsMenuOpen(false);
                }}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection("cakes");
                  setIsMenuOpen(false);
                }}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Cakes
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection("contact");
                  setIsMenuOpen(false);
                }}
                className="hover:text-[#D0AC77] transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
