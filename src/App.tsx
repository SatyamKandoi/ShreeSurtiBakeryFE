import { useState } from "react";
import "./App.css";
import AboutUs from "./components/About";
import BakeryFooter from "./components/Footer";
import MegaMenu, { type Section } from "./components/Header";
import HeroCarousel from "./components/Hero";
import ThreadsSection from "./components/Threads";
import VisitUs from "./components/VisitUs";
import { GalleryPage } from "./pages/Gallery";
import { ContactUs } from "./pages/Contact";
import { Products } from "./pages/Products";
import { Cakes } from "./pages/Cakes";
import { FeaturedVideo } from "./components/Featured";
import { ProductCarousel } from "./components/ProductsCarousel";

function App() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const birthdayCakes = [
    {
      id: 1,
      name: "Chocolate Delight",
      category: "Birthday",
      price: 1200,
      image: "/Cakes/chocolate-cake.jpg",
    },
    {
      id: 2,
      name: "Vanilla Bliss",
      category: "Birthday",
      price: 1100,
      image: "/Cakes/vanilla-cake.jpg",
    },
    {
      id: 3,
      name: "Red Velvet",
      category: "Birthday",
      price: 1300,
      image: "/Cakes/red-velvet.jpg",
    },
    {
      id: 4,
      name: "Confetti Cake",
      category: "Birthday",
      price: 1250,
      image: "/Cakes/confetti-cake.jpg",
    },
  ];
  return (
    <>
      <MegaMenu setActiveSection={setActiveSection} />
      {activeSection === "home" && (
        <>
          <HeroCarousel />
          <AboutUs />
          <ProductCarousel
            title="Our Cakes Collection"
            products={birthdayCakes}
          />
          <ThreadsSection />
          <FeaturedVideo />
          <VisitUs />
        </>
      )}
      {activeSection === "gallery" && <GalleryPage />}
      {activeSection === "products" && <Products />}
      {activeSection === "cakes" && <Cakes />}
      {activeSection === "contact" && <ContactUs />}
      <BakeryFooter />
    </>
  );
}

export default App;
