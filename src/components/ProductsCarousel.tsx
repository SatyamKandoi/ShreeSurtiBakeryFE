import React, { useEffect, useRef } from "react";
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

  // duplicate for "infinite" feel (optional)
  const carouselProducts = [...products, ...products];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // ---------- WHEEL (mouse) handling ----------
    let scrollTimeoutId: number;

    const onWheel = (e: WheelEvent) => {
      if (!isHoverRef.current) return;

      const deltaY = e.deltaY;
      const deltaX = e.deltaX;

      if (Math.abs(deltaX) > Math.abs(deltaY)) return;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atLeft = el.scrollLeft <= 0;
      const atRight = el.scrollLeft >= maxScrollLeft - 1;

      if ((atLeft && deltaY < 0) || (atRight && deltaY > 0)) return;

      e.preventDefault();

      const sensitivity = 2.5;
      el.scrollLeft += deltaY * sensitivity;

      clearTimeout(scrollTimeoutId);
      scrollTimeoutId = setTimeout(() => {}, 150);
    };

    // ---------- POINTER / TOUCH handling ----------
    let pointerId: number | null = null;
    let isPointerActive = false;
    let startX = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let isDragging = false;
    const TOUCH_TOLERANCE = 3;

    const onPointerDown = (ev: PointerEvent) => {
      if (ev.isPrimary === false) return;
      pointerId = ev.pointerId;
      isPointerActive = true;
      startX = lastX = ev.clientX;
      lastTime = performance.now();
      velocity = 0;
      isDragging = false;
      try {
        el.setPointerCapture(pointerId);
      } catch {}
    };

    const onPointerMove = (ev: PointerEvent) => {
      if (!isPointerActive) return;
      const cx = ev.clientX;
      const dx = cx - lastX;
      const now = performance.now();
      const dt = now - lastTime;

      if (dt > 0) velocity = dx / dt;

      lastX = cx;
      lastTime = now;

      if (!isDragging) {
        const totalDx = Math.abs(cx - startX);
        if (totalDx > TOUCH_TOLERANCE) isDragging = true;
        else return;
      }

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atLeft = el.scrollLeft <= 0;
      const atRight = el.scrollLeft >= maxScrollLeft - 1;

      if ((atLeft && dx > 0) || (atRight && dx < 0)) {
        isPointerActive = false;
        isDragging = false;
        try {
          if (pointerId != null) el.releasePointerCapture(pointerId);
        } catch {}
        return;
      }

      ev.preventDefault();
      el.scrollLeft -= dx * 1.1; // scrollFactor
    };

    const onPointerUpOrCancel = () => {
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

      if (Math.abs(velocity) > 0.1) {
        const momentum = velocity * 100;
        el.scrollBy({ left: -momentum, behavior: "smooth" });
      }

      try {
        if (pointerId != null) el.releasePointerCapture(pointerId);
      } catch {}
      pointerId = null;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", onPointerUpOrCancel);
    el.addEventListener("pointercancel", onPointerUpOrCancel);

    // Touch fallback
    let touchStartX = 0;
    let touchLastX = 0;
    let touchLastTime = 0;
    let touchVelocity = 0;
    let touchActive = false;
    let touchDragging = false;

    const onTouchStart = (te: TouchEvent) => {
      if (te.touches.length !== 1) return;
      const t = te.touches[0];
      touchStartX = touchLastX = t.clientX;
      touchLastTime = performance.now();
      touchVelocity = 0;
      touchActive = true;
      touchDragging = false;
    };

    const onTouchMove = (te: TouchEvent) => {
      if (!touchActive) return;
      const t = te.touches[0];
      const dx = t.clientX - touchLastX;
      const now = performance.now();
      const dt = now - touchLastTime;
      if (dt > 0) touchVelocity = dx / dt;

      touchLastX = t.clientX;
      touchLastTime = now;

      if (!touchDragging) {
        const totalDx = Math.abs(t.clientX - touchStartX);
        if (totalDx > TOUCH_TOLERANCE) touchDragging = true;
        else return;
      }

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atLeft = el.scrollLeft <= 0;
      const atRight = el.scrollLeft >= maxScrollLeft - 1;

      if ((atLeft && dx > 0) || (atRight && dx < 0)) {
        touchActive = false;
        touchDragging = false;
        return;
      }

      te.preventDefault();
      el.scrollLeft -= dx * 1.1;
    };

    const onTouchEndOrCancel = () => {
      if (!touchDragging) {
        touchActive = false;
        touchDragging = false;
        return;
      }
      touchActive = false;
      touchDragging = false;

      if (Math.abs(touchVelocity) > 0.1) {
        const momentum = touchVelocity * 100;
        el.scrollBy({ left: -momentum, behavior: "smooth" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEndOrCancel);
    el.addEventListener("touchcancel", onTouchEndOrCancel);

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
    };
  }, []);

  const onMouseEnter = () => (isHoverRef.current = true);
  const onMouseLeave = () => (isHoverRef.current = false);

  const scrollBy = (distance: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className="py-5 w-full relative bg-[#e8dcce]">
      <h2 className="text-3xl md:text-4xl font-serif font-medium mb-8 ml-10 md:ml-30 text-[#5c4f3d] relative">
        {title}
      </h2>

      <div className="relative mx-auto w-4/5">
        {/* Arrows */}
        <button
          onClick={() => scrollBy(-350)}
          className="md:flex absolute -left-4 top-1/2 -translate-y-1/2 text-2xl shadow-md rounded-full z-10 hover:scale-110 transition-transform"
          aria-label="Scroll left"
        >
          &#8592;
        </button>

        <button
          onClick={() => scrollBy(350)}
          className="md:flex absolute -right-4 top-1/2 -translate-y-1/2 text-2xl shadow-md rounded-full z-10 hover:scale-110 transition-transform"
          aria-label="Scroll right"
        >
          &#8594;
        </button>

        <div
          ref={scrollRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="flex space-x-4 overflow-x-auto overflow-y-hidden py-4 snap-x snap-mandatory bakery-scrollbar"
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
                  loading="lazy"
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
