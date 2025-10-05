import React, { useEffect, useRef, useState } from "react";
import "./ProductsCarousel.css";

// Add Razorpay type declaration
declare global {
  interface Window {
    Razorpay: any;
  }
}

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

interface PaymentDetails {
  paymentId: string;
  orderId: string;
  product: Product;
  timestamp: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isHoverRef = useRef(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [processingProducts, setProcessingProducts] = useState<
    Map<number, boolean>
  >(new Map());
  // Add state for invoice modal
  const [showInvoice, setShowInvoice] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Function to check if a specific product is in processing state
  const isProcessingPayment = (productId: number) => {
    return processingProducts.get(productId) || false;
  };

  // Function to set processing state for a specific product
  const setProductProcessing = (productId: number, isProcessing: boolean) => {
    setProcessingProducts((prev) => {
      const updated = new Map(prev);
      if (isProcessing) {
        updated.set(productId, true);
      } else {
        updated.delete(productId);
      }
      return updated;
    });
  };

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setIsRazorpayLoaded(true);
      document.body.appendChild(script);
    };
    loadRazorpay();

    return () => {
      // Clean up script if component unmounts
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (script) document.body.removeChild(script);
    };
  }, []);

  // Function to generate a random order ID for demo purposes
  const generateOrderId = () => {
    return (
      "order_" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  // Direct Razorpay integration without backend API calls
  const handlePayment = async (product: Product) => {
    if (!isRazorpayLoaded) {
      alert("Payment gateway is loading. Please try again in a moment.");
      return;
    }

    if (isProcessingPayment(product.id)) {
      return; // Prevent multiple simultaneous payment attempts for the same product
    }

    try {
      setProductProcessing(product.id, true);

      // Convert price to paise (Razorpay expects amount in smallest currency unit)
      const amountInPaise = product.price * 100;

      // Generate a dummy order ID for demo purposes
      const dummyOrderId = generateOrderId();

      // Initialize Razorpay directly with product data
      const options = {
        key: "rzp_test_RPihrJSAMsTFJW", // Your test key
        amount: amountInPaise,
        currency: "INR",
        name: "Shree Surti Bakery",
        description: `Payment for ${product.name}`,
        handler: function (response: any) {
          // Set payment details for invoice
          setPaymentDetails({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id || dummyOrderId,
            product: product,
            timestamp: new Date().toLocaleString(),
          });

          // Show invoice modal instead of alert
          setShowInvoice(true);

          // Handle successful payment
          console.log("Payment successful:", response);
          setProductProcessing(product.id, false);
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          productId: product.id,
          productName: product.name,
        },
        theme: {
          color: "#663D34",
        },
        modal: {
          ondismiss: function () {
            setProductProcessing(product.id, false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
        console.error("Payment failed:", response.error);
        setProductProcessing(product.id, false);
      });

      razorpay.open();
    } catch (err) {
      console.error("Payment process error:", err);
      alert("Failed to initiate payment. Please try again.");
      setProductProcessing(product.id, false);
    }
  };

  // duplicate for "infinite" feel (optional)
  const carouselProducts = [...products, ...products];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // ---------- WHEEL (mouse) handling ----------
    let scrollTimeoutId: ReturnType<typeof setTimeout>;

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

  // Native browser print function
  const handleNativePrint = () => {
    // Add print-specific CSS to the document
    const printStyles = document.createElement("style");
    printStyles.id = "print-styles";
    printStyles.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #invoice-content, #invoice-content * {
          visibility: visible;
        }
        #invoice-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 20px;
        }
        #invoice-buttons {
          display: none !important;
        }
        @page {
          size: auto;
          margin: 20mm;
        }
      }
    `;
    document.head.appendChild(printStyles);

    // Apply ID to invoice content for print targeting
    if (invoiceRef.current) {
      invoiceRef.current.id = "invoice-content";
    }

    // Trigger browser print dialog
    window.print();
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
  };

  return (
    <>
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
                  <p className="text-gray-700 font-medium">
                    Rs. {product.price}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handlePayment(product)}
                      disabled={isProcessingPayment(product.id)}
                      className={`bg-[#663D34] text-[#FFFEE5] rounded-full font-semibold px-4 py-2 text-sm lg:text-base transition-shadow shadow-md cursor-pointer hover:bg-[#7a4940] ${
                        isProcessingPayment(product.id) ? "opacity-70" : ""
                      }`}
                    >
                      {isProcessingPayment(product.id)
                        ? "Processing..."
                        : "Buy Now"}
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

      {/* Fullscreen Invoice Modal */}
      {showInvoice && paymentDetails && (
        <div className="fixed inset-0 bg-[#f8f8f8] z-50 overflow-y-auto overflow-x-hidden">
          <div className="max-w-4xl mx-auto p-6 md:p-10 my-8" ref={invoiceRef}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-serif text-[#5c4f3d] mb-2">
                  Invoice
                </h2>
                <p className="text-gray-500">Thank you for your purchase!</p>
              </div>
              <img
                src="/bakery-logo.png"
                alt="Bakery Logo"
                className="h-20 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/160x80?text=Bakery+Logo";
                }}
              />
            </div>

            <div className="border-t border-b border-gray-200 my-8 py-6">
              <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-700 text-xl mb-2">
                    Order Details
                  </h3>
                  <p className="text-gray-600">
                    Order ID:{" "}
                    <span className="font-medium">
                      {paymentDetails.orderId}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Date:{" "}
                    <span className="font-medium">
                      {paymentDetails.timestamp}
                    </span>
                  </p>
                </div>
                <div className="md:text-right">
                  <h3 className="font-semibold text-gray-700 text-xl mb-2">
                    Payment Details
                  </h3>
                  <p className="text-gray-600">
                    Payment ID:{" "}
                    <span className="font-medium">
                      {paymentDetails.paymentId}
                    </span>
                  </p>
                  <p className="text-green-600 font-medium">Status: Paid</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 text-xl mb-4">
                Product Details
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="h-24 w-24 bg-white rounded overflow-hidden mr-6 flex-shrink-0 border border-gray-100 p-2">
                    <img
                      src={paymentDetails.product.image}
                      alt={paymentDetails.product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-lg">
                      {paymentDetails.product.name}
                    </h4>
                    <p className="text-gray-500">
                      Category: {paymentDetails.product.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">
                      Rs. {paymentDetails.product.price}
                    </p>
                    <p className="text-gray-500">Qty: 1</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex justify-between mb-2 text-lg">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">
                  Rs. {paymentDetails.product.price}
                </p>
              </div>
              <div className="flex justify-between mb-2 text-lg">
                <p className="text-gray-600">Tax</p>
                <p className="font-medium">Rs. 0.00</p>
              </div>
              <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t border-gray-200">
                <p>Total</p>
                <p>Rs. {paymentDetails.product.price}</p>
              </div>
            </div>

            <div
              id="invoice-buttons"
              className="mt-10 flex flex-wrap justify-between gap-4"
            >
              <button
                onClick={handleCloseInvoice}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-full transition-colors text-lg"
              >
                Close
              </button>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handleNativePrint}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors text-lg"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
