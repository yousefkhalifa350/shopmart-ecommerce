// 'use client'

// import { Menu, Heart, ShoppingCart } from 'lucide-react'
// import Link from 'next/link'

// export default function Mobilenavui() {
//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 sm:hidden">
//       <div className="flex items-center justify-between px-4 py-3">

//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-full bg-[#c62828] text-white flex items-center justify-center font-bold">
//             S
//           </div>
//           <span className="text-lg font-extrabold text-gray-900">
//             ShopMart
//           </span>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-4">
//           <Heart className="w-5 h-5 text-gray-800" />
//           <ShoppingCart className="w-5 h-5 text-gray-800" />
//           <Menu className="w-6 h-6 text-gray-900" />
//         </div>

//       </div>
//     </nav>
//   )
// }





'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Menu,
  X,
  LayoutGrid,
  FileText,
  User,
  Home,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'

export default function MobileNavbarUI() {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-3">

          {/* Logo */}
          <span className="text-xl font-bold text-blue-700">e-move</span>

          {/* Menu Button */}
          <button
            ref={btnRef}
            onClick={() => setOpen(!open)}
            className="w-11 h-11 rounded-md border-2 border-blue-600 flex items-center justify-center
            shadow-[0_0_0_4px_rgba(37,99,235,0.25)]"
          >
            <Menu className="w-6 h-6 text-blue-700" />
          </button>
        </div>
      </nav>

      {/* ================= DROPDOWN ================= */}
      <div
        className={`
          fixed top-[64px] right-4 z-[9999]
          transition-all duration-200 ease-out
          ${open ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}
        `}
      >
        <div
          ref={menuRef}
          className="w-64 bg-white border border-gray-300 shadow-xl rounded-sm relative"
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 w-10 h-10 rounded-md border-2 border-blue-600
            flex items-center justify-center
            shadow-[0_0_0_4px_rgba(37,99,235,0.25)]"
          >
            <X className="w-5 h-5 text-blue-700" />
          </button>

          {/* Divider */}
          <div className="h-px bg-gray-300 mt-16 mx-4" />

          {/* Menu */}
          <ul className="px-5 py-4 space-y-4 text-[15px]">
            <Item icon={<LayoutGrid />} text="Services" />
            <Item icon={<FileText />} text="Tickets History" />
            <Item icon={<User />} text="Profile" />
            <Item icon={<Home />} text="Unit Profile" />
            <Item icon={<LogOut />} text="Logout" danger />
          </ul>
        </div>
      </div>
    </>
  )
}

/* ================= MENU ITEM ================= */

function Item({
  icon,
  text,
  danger,
}: {
  icon: React.ReactNode
  text: string
  danger?: boolean
}) {
  return (
    <li>
      <button
        className={`
          flex items-center gap-3 w-full
          transition-colors duration-150
          ${danger
            ? 'text-blue-700 hover:text-red-600'
            : 'text-blue-700 hover:text-blue-900'}
        `}
      >
        <span className="w-5 h-5">{icon}</span>
        {text}
      </button>
    </li>
  )
}
