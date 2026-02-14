"use client";

import React, { useEffect, useState } from "react";
import { Menu, UserCircle, UserPlus } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Mobilenavtop() {
  const session = useSession();

  // 👇 الحل
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 🔥 دي أهم سطر

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Menu className="w-6 h-6 sm:hidden" />
        </button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>

          <div className="mt-8 flex flex-col gap-6 text-base">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/products" className="hover:underline">Products</Link>
            <Link href="/brands" className="hover:underline">Brands</Link>
            <Link href="/categories" className="hover:underline">Categories</Link>

            <hr className="my-2" />

            {session.status !== "authenticated" && (
              <>
                <Link href="/login" className="flex items-center gap-2 hover:underline">
                  <UserCircle className="w-5 h-5" />
                  Sign In
                </Link>

                <Link href="/register" className="flex items-center gap-2 hover:underline">
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </Link>
              </>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
