import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";




export default function Footer() {
  return (
    <footer className="mt-2 bg-[#20333A] text-white">
      {/* TOP */}
      <div
        className="
          max-w-7xl mx-auto
          px-6
          py-16
          grid
          grid-cols-1
          md:grid-cols-3
          gap-14
          text-center
          md:text-left
        "
      >
        {/* SOCIAL */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-6 text-lg">
            Social media Accounts :
          </h3>

          <div className="flex gap-4 justify-center md:justify-start">
            {[
              { Icon: FaFacebookF, label: "Facebook" },
              { Icon: FaInstagram, label: "Instagram" },
              { Icon: FaTiktok, label: "TikTok" },
              { Icon: FaWhatsapp, label: "WhatsApp" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="
                  w-11 h-11
                  rounded-full
                  bg-white
                  text-[#20333A]
                  flex items-center justify-center
                  shadow-md
                  transition-all duration-300
                  hover:bg-[#FF9F1C]
                  hover:text-white
                  hover:-translate-y-1
                "
              >
                <Icon className="text-[18px]" />
              </button>
            ))}
          </div>
        </div>

        {/* REVIEWS BADGE */}
        <div className="flex justify-center">
          <div
            className="
              bg-white/5
              border border-white/20
              rounded-2xl
              p-6
              shadow-lg
              backdrop-blur
            "
          >
            <Image
              src="/reviews.svg"
              alt="Verified reviews"
              width={260}
              height={150}
              className="w-56 sm:w-60 h-auto"
            />
          </div>
        </div>

        {/* LINKS */}
        <nav className="flex flex-col items-center md:items-start space-y-4 text-lg">
          {["Home", "Shipping & Tracking", "Blog", "Contact Us"].map((item) => (
            <a
              key={item}
              href="#"
              className="
                transition-all duration-300
                hover:text-[#FF9F1C]
                hover:translate-x-1
              "
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10" />

      {/* BOTTOM */}
      <div
        className="
          max-w-7xl mx-auto
          px-6
          py-8
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-6
          text-center
          md:text-left
        "
      >
        {/* COPYRIGHT */}
        <div className="text-sm opacity-90">
          © 2026 /. Powered by Shopify.
        </div>

        {/* PAYMENTS */}
        <div className="flex gap-4 items-center justify-center">
          {["amex", "mastercard", "visa"].map((card) => (
            <div
              key={card}
              className="
                bg-white
                rounded-lg
                px-3 py-2
                shadow-sm
              "
            >
              <Image
                src={`/${card}.svg`}
                alt={card}
                width={60}
                height={30}
                className="h-5 w-auto"
              />
            </div>
          ))}
        </div>
      </div>

    </footer>



  );
}

