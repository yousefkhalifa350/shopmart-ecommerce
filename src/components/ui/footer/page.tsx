import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";




export default function Footer() {
  return (
    <footer className=" bg-[#232020] text-white">
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
            Social Media Accounts :
          </h3>
<div className="flex gap-4 justify-center md:justify-start">
  {[
    { Icon: FaFacebookF, label: "Facebook" },
    { Icon: FaInstagram, label: "Instagram" },
    { Icon: FaTiktok, label: "TikTok" },
    { Icon: FaWhatsapp, label: "WhatsApp" },
  ].map(({ Icon, label }) => (
    <div key={label} className="relative group">
      {/* Tooltip */}
      <span
        className="
          absolute -top-9 left-1/2 -translate-x-1/2
          scale-0 group-hover:scale-100
          transition-transform duration-200
          bg-white text-black text-xs
          px-3 py-1 rounded-md shadow-lg
          whitespace-nowrap
        "
      >
        {label}
      </span>

      {/* Icon Button */}
      <button
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
          cursor-pointer
        "
      >
        <Icon className="text-[18px]" />
      </button>
    </div>
  ))}
</div>

        </div>

      <div className="flex justify-center">
  <div className="
    bg-[#1f3b44]
    rounded-full
    w-56 h-56
    flex flex-col items-center justify-center
    text-center
    border-4 border-[#7bdff2]
    shadow-xl
  ">
    <span className="text-3xl font-bold text-white">898</span>

    <div className="flex text-yellow-400 my-2">
      ★★★★★
    </div>

    <span className="
      bg-[#fbbf24]
      text-black
      font-semibold
      px-4 py-1
      rounded-full
      text-sm
    ">
      Verified Reviews
    </span>
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
      <div className="border-t border-white" />

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
          gap-4
          text-center
          md:text-left
        "
      >
        {/* COPYRIGHT */}
        <div className="text-sm opacity-90">
  © 2026 / 
<a
  href="https://www.linkedin.com/in/yousef-hesham-8197a5284/"
  className="relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
>
  ShopMart Built by Yousef Hesham.
</a>


</div>

        {/* PAYMENTS */}
        <div className="flex gap-4 items-center justify-center">
  
   <img width="74" height="74" src="/CreditCard.jpeg" alt="CreditCard"  className="hidden sm:block"/>
  <img  width="74" height="74" src="/icons_AMEX.jpeg" alt="icons_AMEX"  className="hidden sm:block"/>
<img   width="74" height="72" src="/MasterCard2.jpeg" alt="MasterCard2"  className="hidden sm:block"/>
        </div>
      </div>




    </footer>



  );
}

