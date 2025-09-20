export const ContactUs = () => {
  const whatsappNumber = "+1234567890"; // replace with your number
  const emailAddress = "info@example.com"; // replace with your email

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.valueOf;
    const email = form.email.value;
    const message = form.message.value;

    // Open default mail client
    window.location.href = `mailto:${emailAddress}?subject=Custom Cake Idea from ${name}&body=${encodeURIComponent(
      message + "\n\nFrom: " + name + " (" + email + ")"
    )}`;
  };

  return (
    <section className="bg-[#e8dcce] py-20 px-6 md:px-32 font-inter min-h-screen">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-playfair mb-4 mt-10">
          Have a Custom Cake Idea?
        </h2>
        <p className="text-lg md:text-xl text-gray-800">
          Share your vision with us, and we'll create a cake that's uniquely
          yours!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#e8dcce] p-10 rounded-2xl  flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="border border-gray-800 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#F0E8BB]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="border border-gray-800 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#F0E8BB]"
          />
          <textarea
            name="message"
            placeholder="Describe your cake idea..."
            required
            rows={8}
            className="border border-gray-800 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#F0E8BB]"
          />
          <button
            type="submit"
            className="bg-[#000000] text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg"
          >
            Send Your Idea
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Email</h3>
            <a
              href={`mailto:${emailAddress}`}
              className="text-[#000000] hover:text-gray-700 underline text-lg"
            >
              {emailAddress}
            </a>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">WhatsApp</h3>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#000000] hover:text-[#128C7E] underline text-lg"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-8">
            <p className="text-gray-700 text-lg">
              Or just drop us a message with your idea and we’ll get back to you
              with a quote and suggestions!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
