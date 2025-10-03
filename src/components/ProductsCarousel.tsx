import React, { useEffect, useRef, useState } from "react";
import "./ProductsCarousel.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isHoverRef = useRef(false);
  // Track if user is actively scrolling for momentum effect
  const [isScrolling, setIsScrolling] = useState(false);

  // duplicate for "infinite" feel (optional)
  const carouselProducts = [...products, ...products];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // ---------- WHEEL (mouse) handling ----------
    const onWheel = (e: WheelEvent) => {
      // only act when pointer is over the carousel
      if (!isHoverRef.current) return;

      // prioritize vertical wheel translation to horizontal scroll
      // if vertical wheel and not already at carousel boundary -> preventDefault and scroll horizontally
      const deltaY = e.deltaY;
      const deltaX = e.deltaX;
      const absY = Math.abs(deltaY);
      const absX = Math.abs(deltaX);

      // ignore mostly-horizontal wheel (rare) -> let default
      if (absX > absY) return;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atLeft = el.scrollLeft <= 0;
      const atRight = el.scrollLeft >= maxScrollLeft - 1;

      // If user is trying to scroll past the edges vertically, allow normal page scroll:
      // - atLeft and scrolling up (deltaY < 0) -> allow
      // - atRight and scrolling down (deltaY > 0) -> allow
      if ((atLeft && deltaY < 0) || (atRight && deltaY > 0)) {
        return; // let the page scroll
      }

      // otherwise intercept and translate vertical wheel into horizontal scroll
      e.preventDefault();

      // Increased sensitivity factor for smoother scrolling
      // This makes the wheel events move the carousel more per event
      const sensitivity = 2.5; // Increased from default 1.0
      el.scrollLeft += deltaY * sensitivity;

      // Set scrolling state for momentum effect
      setIsScrolling(true);
      clearTimeout(scrollTimeoutId);
      scrollTimeoutId = setTimeout(() => setIsScrolling(false), 150);
    };

    // ---------- POINTER / TOUCH handling ----------
    // We'll use pointer events where available and fallback to touch events.
    let pointerId: number | null = null;
    let isPointerActive = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let velocity = 0;
    let isDragging = false;
    const TOUCH_TOLERANCE = 3;

    // Lower threshold to detect intent faster (was 6)
    let scrollTimeoutId: number;

    const onPointerDown = (ev: PointerEvent) => {
      // only primary pointers
      if (ev.isPrimary === false) return;
      pointerId = ev.pointerId;
      isPointerActive = true;
      startX = lastX = ev.clientX;
      startY = lastY = ev.clientY;
      lastTime = performance.now();
      velocity = 0;
      isDragging = false;
      // capture pointer so we continue receiving pointermove/up
      try {
        el.setPointerCapture(pointerId);
      } catch {
        /* ignore if not supported */
      }
    };

    const onPointerMove = (ev: PointerEvent) => {
      if (!isPointerActive) return;
      const cx = ev.clientX;
      const cy = ev.clientY;
      const dx = cx - lastX;
      const dy = cy - lastY;
      const now = performance.now();
      const dt = now - lastTime;

      // Calculate velocity for momentum effect
      if (dt > 0) {
        velocity = dx / dt; // pixels per ms
      }

      lastX = cx;
      lastY = cy;
      lastTime = now;

      // If we haven't decided whether it's horizontal or vertical yet:
      if (!isDragging) {
        const totalDx = Math.abs(cx - startX);
        const totalDy = Math.abs(cy - startY);

        // If vertical motion dominates -> release capture and let page handle it
        if (totalDy > totalDx && totalDy > TOUCH_TOLERANCE) {
          isPointerActive = false;
          isDragging = false;
          try {
            if (pointerId != null) el.releasePointerCapture(pointerId);
          } catch {}
          return;
        }

        // If horizontal motion dominates -> we treat this as drag for carousel
        if (totalDx > totalDy && totalDx > TOUCH_TOLERANCE) {
          isDragging = true;
          setIsScrolling(true);
        } else {
          return; // not enough movement yet
        }
      }

      // Now we're in horizontal drag mode.
      // If at edges and attempting to scroll beyond, release capture so page may scroll.
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atLeft = el.scrollLeft <= 0;
      const atRight = el.scrollLeft >= maxScrollLeft - 1;

      // dx > 0 : finger moved right (user likely wants to scroll left)
      // dx < 0 : finger moved left (user likely wants to scroll right)
      // If atLeft and user moves finger right (dx > 0) -> can't scroll left any further -> release to allow page
      if ((atLeft && dx > 0) || (atRight && dx < 0)) {
        isPointerActive = false;
        isDragging = false;
        setIsScrolling(false);
        try {
          if (pointerId != null) el.releasePointerCapture(pointerId);
        } catch {}
        return;
      }

      // preventDefault to stop page vertical scroll while dragging horizontally
      // because this listener is added with passive: false, preventDefault works
      ev.preventDefault();

      // Perform the horizontal scroll with improved sensitivity for smoother feeling
      const scrollFactor = 1.1; // Slightly increase drag effect
      el.scrollLeft -= dx * scrollFactor;
    };

    const onPointerUpOrCancel = (ev: PointerEvent) => {
      if (!isDragging) {
        isPointerActive = false;
        try {
          if (pointerId != null) el.releasePointerCapture(pointerId);
        } catch {}
        pointerId = null;
        return;
      }

      isPointerActive = false;
      isDragging = false;

      // Apply momentum scrolling when finger is lifted
      if (Math.abs(velocity) > 0.1) {
        const momentum = velocity * 100; // Amplify the effect

        // Apply a smooth deceleration using animation
        el.scrollBy({
          left: -momentum,
          behavior: "smooth",
        });
      }

      // Clear scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 300);

      try {
        if (pointerId != null) el.releasePointerCapture(pointerId);
      } catch {}
      pointerId = null;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", onPointerUpOrCancel);
    el.addEventListener("pointercancel", onPointerUpOrCancel);

    // Fallback for browsers that don't support pointer events (older Safari): touch handlers
    // (we add them with passive: false so preventDefault works)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchLastX = 0;
    let touchLastY = 0;
    let touchLastTime = 0;
    let touchVelocity = 0;
    let touchActive = false;
    let touchDragging = false;

    const onTouchStart = (te: TouchEvent) => {
      if (te.touches.length !== 1) return;
      const t = te.touches[0];
      touchStartX = touchLastX = t.clientX;
      touchStartY = touchLastY = t.clientY;
      touchLastTime = performance.now();
      touchVelocity = 0;
      touchActive = true;
      touchDragging = false;
    };

    const onTouchMove = (te: TouchEvent) => {
      if (!touchActive) return;
      const t = te.touches[0];
      const dx = t.clientX - touchLastX;
      const dy = t.clientY - touchLastY;
      const now = performance.now();
      const dt = now - touchLastTime;

      // Calculate velocity for momentum
      if (dt > 0) {
        touchVelocity = dx / dt;
      }

      touchLastX = t.clientX;
      touchLastY = t.clientY;
      touchLastTime = now;

      if (!touchDragging) {
        const totalDx = Math.abs(t.clientX - touchStartX);
        const totalDy = Math.abs(t.clientY - touchStartY);
        if (totalDy > totalDx && totalDy > TOUCH_TOLERANCE) {
          touchActive = false;
          touchDragging = false;
          return; // vertical intent -> let page scroll
        }
        if (totalDx > totalDy && totalDx > TOUCH_TOLERANCE) {
          touchDragging = true;
          setIsScrolling(true);
        } else {
          return;
        }
      }

      // at this point we're in horizontal drag
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atLeft = el.scrollLeft <= 0;
      const atRight = el.scrollLeft >= maxScrollLeft - 1;

      if ((atLeft && dx > 0) || (atRight && dx < 0)) {
        // allow page to take over when trying to drag beyond edges
        touchActive = false;
        touchDragging = false;
        setIsScrolling(false);
        return;
      }

      te.preventDefault(); // stop page vertical scroll while horizontally dragging

      // Apply slightly increased sensitivity for smoother dragging
      const touchFactor = 1.1;
      el.scrollLeft -= dx * touchFactor;
    };

    const onTouchEndOrCancel = () => {
      if (!touchDragging) {
        touchActive = false;
        touchDragging = false;
        return;
      }

      touchActive = false;
      touchDragging = false;

      // Apply momentum scrolling
      if (Math.abs(touchVelocity) > 0.1) {
        const momentum = touchVelocity * 100;

        el.scrollBy({
          left: -momentum,
          behavior: "smooth",
        });
      }

      // Clear scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEndOrCancel);
    el.addEventListener("touchcancel", onTouchEndOrCancel);

    // ---------- cleanup ----------
    return () => {
      el.removeEventListener("wheel", onWheel as EventListener);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove as EventListener);
      el.removeEventListener("pointerup", onPointerUpOrCancel);
      el.removeEventListener("pointercancel", onPointerUpOrCancel);
      el.removeEventListener("touchstart", onTouchStart as EventListener);
      el.removeEventListener("touchmove", onTouchMove as EventListener);
      el.removeEventListener("touchend", onTouchEndOrCancel);
      el.removeEventListener("touchcancel", onTouchEndOrCancel);
      clearTimeout(scrollTimeoutId);
    };
  }, []);

  // helper for desktop hover detection (so wheel only activates when cursor is over the carousel)
  const onMouseEnter = () => (isHoverRef.current = true);
  const onMouseLeave = () => (isHoverRef.current = false);

  // smooth arrow scroll with improved distance for better UX
  const scrollBy = (distance: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: distance, behavior: "smooth" });

    // Visual feedback while scrolling
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 300);
  };

  return (
    <section className="py-5 w-full relative bg-[#e8dcce]">
      <h2 className="text-3xl md:text-4xl font-serif font-medium mb-8 ml-10 md:ml-30 text-[#5c4f3d] relative">
        {title}
      </h2>

      <div className="relative mx-auto w-4/5">
        {/* Arrows: visible on md+ (desktop) */}
        <button
          onClick={() => scrollBy(-350)} // Increased scroll distance
          className="md:flex absolute -left-8 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-full z-10 hover:bg-gray-800 transition-colors"
          aria-label="Scroll left"
        >
          &#8592;
        </button>

        <button
          onClick={() => scrollBy(350)} // Increased scroll distance
          className=" md:flex absolute -right-8 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-full z-10 hover:bg-gray-800 transition-colors"
          aria-label="Scroll right"
        >
          &#8594;
        </button>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`flex space-x-4 overflow-x-auto overflow-y-hidden py-4 snap-x snap-mandatory bakery-scrollbar`}
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {carouselProducts.map((product, idx) => (
            <article
              key={idx}
              className="flex-none w-64 snap-start rounded-2xl shadow-lg transform transition-all duration-300 overflow-hidden relative bg-gradient-to-b from-[#fff5e6] to-[#e8d8c2] hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute top-2 left-2 bg-gradient-to-r from-[#f4c150] to-[#e0b040] text-white text-xs font-semibold px-3 py-1 rounded-lg shadow animate-pulse">
                {product.category}
              </div>

              <div className="relative w-full h-40 overflow-hidden rounded-t-2xl bg-[#fff8f0]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
                  loading="lazy" // Performance improvement for images
                />
                <div className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors" />
              </div>

              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-700 font-medium">Rs. {product.price}</p>

                <div className="flex gap-2 mt-2">
                  <button className="bg-[#663D34] text-[#FFFEE5] rounded-full font-semibold px-4 py-2 text-sm lg:text-base transition-shadow shadow-md cursor-pointer">
                    Buy Now
                  </button>
                  <button className="bg-[#663D34] text-[#FFFEE5] rounded-full font-semibold px-4 py-2 text-sm lg:text-base transition-shadow shadow-md cursor-pointer">
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
