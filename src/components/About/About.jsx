import React from "react";

function About() {


  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <div className="relative h-[460px] w-full">
        <img
          src="https://plus.unsplash.com/premium_photo-1681276170683-706111cf496e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Jewellery"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#cda454]">
            {/* About Us */}
          </h1>
        </div>
      </div>

      {/* ABOUT CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center text-[#cda454] mb-8">
          Our Story
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-4xl mx-auto">
          At <span className="font-semibold text-[#cda454]">KIRA </span>, we believe
          jewellery is more than just an accessory — it is a symbol of elegance,
          tradition, and timeless beauty. Our collections are carefully crafted
          with attention to detail, blending modern design with classic
          craftsmanship.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-4xl mx-auto mt-6">
          From stunning rings to elegant necklaces, each piece is designed to
          celebrate life's special moments. Our goal is to bring you jewellery
          that shines with quality, sophistication, and lasting value.
        </p>

      </div>

      {/* VALUES SECTION */}
      <div className="bg-gray-50 py-16">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center text-[#cda454] mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#cda454] mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                We use high-quality metals and carefully selected stones to
                ensure every piece is crafted to perfection.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#cda454] mb-3">
                Elegant Designs
              </h3>
              <p className="text-gray-600">
                Our jewellery blends timeless craftsmanship with modern trends
                to create pieces that never go out of style.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#cda454] mb-3">
                Trusted Service
              </h3>
              <p className="text-gray-600">
                Customer satisfaction is our priority. We ensure a smooth and
                secure shopping experience.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* IMAGE SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        <img
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1170&auto=format&fit=crop"
          alt="Jewellery Craft"
          className="rounded-lg shadow-md"
        />

        <div>
          <h2 className="text-3xl font-bold text-[#cda454] mb-6">
            Crafting Timeless Beauty
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Our artisans combine traditional techniques with modern innovation
            to create jewellery that reflects elegance and sophistication.
            Every design is made to enhance your style and celebrate your
            individuality.
          </p>

        </div>

      </div>

    </div>
  );
}

export default About;