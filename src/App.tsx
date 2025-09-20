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

function App() {
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <>
      <MegaMenu setActiveSection={setActiveSection} />
      {activeSection === "home" && (
        <>
          <HeroCarousel />
          <AboutUs />
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
