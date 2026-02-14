'use server'
import SplittingText from "@/components/ui/textworld/page";
import Image from "next/image";
// import {Button} from "@heroui/react";

import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Card, CardContent } from "@/components/ui/card"




import * as React from "react"
import { Brand, Category, Product } from "@/interfaces";
import CategoriesDetails from "./(pages)/categories/[categoriesID]/page";
import Categoriesslider from "@/components/ui/categoriesSliders/page";
import RotatingText from "@/components/ui/rotating-text";
import Herorotatingtext from "@/components/ui/hero-rotating-text";
import HeroUpDown from "@/components/ui/hero-up-down";
import HeroUpDowntow from "@/components/ui/hero-up-down-2";
import Twentysixcomp from "@/components/ui/Twentysixcomp";
import ComeColourfultext from "@/components/ui/comeColourfulText";
// =======================
// HOME – DATA DRIVEN
// =======================



export default async function Home() {
  const [productsRes, brandsRes] = await Promise.all([
    fetch("https://ecommerce.routemisr.com/api/v1/products", {
      next: { revalidate: 300 },
    }),
    
    fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      next: { revalidate: 300 },
    }),
  ]);



 
  // const { data: products } = await productsRes.json();

    const result = await productsRes.json()

    const products:Product[] = Array.isArray(result.data) ? result.data : [];




  // const { data: brands } = await brandsRes.json();


  const result2 = await brandsRes.json()


  const brands:Brand[]= Array.isArray(result2.data)? result2.data : [];





  return (
    <main className="bg-white text-[#0A0A0A] space-y-28">

      {/* ================= HERO (from CATEGORY IMAGE) ================= */}
  


      <section className="relative h-screen w-full overflow-hidden">
  {/* Video background */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/35" />

  {/* Content */}
  <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6">
    <div className="max-w-xl text-white">
   <div className="max-w-xl text-white">
  <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
    <SplittingText text="Shop Smarter Live Better..." />
  </h1>
</div>

      <p className="mt-5 text-lg text-white/90">
        Premium products, trusted brands, and seamless shopping—made for you.
      </p>

      <Link
        href="/products"
        className="inline-block mt-8 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
      >
        Shop Now
      </Link>
    </div>
  </div>
</section>


    

<HeroUpDown/>



      {/* ================= PREMIUM CATEGORIES ================= */}
<Categoriesslider/>




      {/* ================= FEATURED PRODUCTS (REAL DATA) ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-3xl font-bold mb-12"> <Herorotatingtext/></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products?.slice(25,40).map((product: any) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group border rounded-2xl p-4 hover:shadow-xl transition"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw,
       (max-width: 1024px) 50vw,
       25vw"
                  className="object-cover group-hover:scale-110 transition"
                />
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {product.brand?.name}
              </p>

              <h3 className="font-semibold leading-tight">
                {product.title.split(" ").slice(0, 4).join(" ")}
              </h3>

              <p className="text-sm text-gray-500">
                ⭐ {product.ratingsAverage}
              </p>

              <p className="mt-1 font-bold">EGP {product.price}</p>
            </Link>
          ))}
        </div>
      </section>



      {/* ================= PREMIUM BRANDS ================= */}
  <section className="py-18 bg-neutral-100">
 
      
             <HeroUpDowntow/>
   

  <div className="max-w-7xl mx-auto px-6">
    

    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
      {brands?.slice(10,25).map((brand: any) => (
        <Link
          key={brand._id}
          href={`/brands/${brand._id}`}
          className="group bg-white rounded-2xl p-8 flex items-center justify-center
                     transition-all duration-300
                     hover:shadow-xl hover:-translate-y-1"
        >
          <Image
            src={brand.image}
            alt={brand.name}
            width={160}
            height={80}
             priority
            className="w-auto h-auto object-contain grayscale group-hover:grayscale-0 transition"
          />
        </Link>
      ))}
    </div>
  </div>
</section>


     
<section className=" py-24 md:py-32">
  <div className="max-w-7xl mx-auto px-6 md:px-8 text-[#1f1f1f]">

    {/* ROW 01 */}
    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-16 pb-12 md:pb-16 border-b border-black/20">
      <div className="text-[56px] sm:text-[72px] md:text-[96px] font-extrabold leading-none text-transparent stroke-white">
        01
      </div>

      <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.2] tracking-tight">
        Quality Comes First
      </p>
    </div>

    {/* ROW 02 */}
    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-16 py-12 md:py-16 border-b border-black/20">
      <div className="text-[56px] sm:text-[72px] md:text-[96px] font-extrabold leading-none text-transparent stroke-white">
        02
      </div>

      <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold leading-snug max-w-4xl">
        Material that is sourced from sustainable plant-based sources
        
      </p>
    </div>

    {/* ROW 03 */}
    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-16 pt-12 md:pt-16">
      <div className="text-[56px] sm:text-[72px] md:text-[96px] font-extrabold leading-none text-transparent stroke-white">
      <Twentysixcomp/>

      </div>

      <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold leading-snug max-w-4xl">
        Production is done in Egypt under carefully monitored conditions
      </p>
    </div>

  </div>
</section>

<section
  className="
    relative
    w-full
    min-h-[85vh]
    md:min-h-screen
    flex
    items-center
    md:items-start
    bg-cover
    bg-no-repeat
    bg-position-[50%_10%]
    md:bg-position-[48%_10%]
  "
  style={{
    backgroundImage: "url('/499_MV.jpeg')",
  }}
>

  <div className="absolute inset-0 bg-black/30" />
{/* Text Content (Mobile only) */}
<div className="relative z-10 px-6 max-w-xl md:hidden">
   <p className="text-xs uppercase text-white/80 mb-3">
    Limited VIP Offer
  </p>

  <h2 className="text-3xl font-extrabold text-white leading-tight">
    Big Sale
  </h2>

  <p className="text-lg font-semibold text-red-500 mt-1">
    <span className="text-2xl font-extrabold ">   Start from <br />  EGP 499</span>
  </p>

   <p className="mt-4 text-white/90 max-w-sm">
    Premium denim crafted for comfort, quality, and everyday style.
  </p>
</div>

  {/* Button */}
<Link
  href="/register"
  className="
     whitespace-nowrap
    inline-flex items-center justify-center

    px-10 py-4
    md:px-8 md:py-4

    rounded-full
    font-semibold

    text-[white]
    border-2 border-[white]

    bg-transparent

    transition-all duration-300 ease-out

    hover:bg-[#006FEE]
    hover:text-white
    hover:scale-105

    active:scale-95

    relative z-10
    md:absolute
    md:bottom-[12%]
    md:left-[12%]
  "
>
  Join Now
</Link>

</section>









    </main>


  );
}






















