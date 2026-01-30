'use server'
import SplittingText from "@/components/ui/textworld/page";
import Image from "next/image";
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
import { Category } from "@/interfaces";
import CategoriesDetails from "./(pages)/categories/[categoriesID]/page";
import Categoriesslider from "@/components/ui/categoriesSliders/page";
// =======================
// HOME – DATA DRIVEN
// =======================

export default async function Home() {
  const [productsRes, categoriesRes, brandsRes] = await Promise.all([
    fetch("https://ecommerce.routemisr.com/api/v1/products", {
      next: { revalidate: 300 },
    }),
    fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      next: { revalidate: 300 },
    }),
    fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      next: { revalidate: 300 },
    }),
  ]);

  const { data: products } = await productsRes.json();
const { data: categories }: { data: Category[] } = 
  await categoriesRes.json();
  const { data: brands } = await brandsRes.json();

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
    <SplittingText text="Shop smarter Live better." />
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


    



<Categoriesslider/>




      {/* ================= FEATURED PRODUCTS (REAL DATA) ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Featured Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(30,40).map((product: any) => (
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
  <section className="py-24 bg-[#99d6ed]">
  <div className="max-w-7xl mx-auto px-6">
    <p className="text-sm uppercase tracking-[0.3em] text-gray-600 mb-14 text-center  font-black">
      Trusted by Premium Brands
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
      {brands.slice(10,20).map((brand: any) => (
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
            className="object-contain grayscale group-hover:grayscale-0 transition"
          />
        </Link>
      ))}
    </div>
  </div>
</section>


      {/* ================= VIP EXPERIENCE (DATA DRIVEN IMAGE) ================= */}
      <section className="relative h-[60vh]">
        <Image
          src={products[1]?.imageCover}
          alt="VIP"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/85" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold">
              Join the VIP Experience
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Fashion, quality, and style — powered by premium brands.
            </p>
            <Link
              href="/register"
              className="inline-block mt-8 px-10 py-4 bg-black text-white rounded-full font-semibold hover:scale-105 transition"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </section>


<div className="pb-2">
  <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
</div>


    </main>


  );
}






















