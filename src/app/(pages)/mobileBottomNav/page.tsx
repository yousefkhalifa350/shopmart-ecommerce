'use client'

import {
  Home,
  Grid,
  ShoppingCart,
  Search,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'




{/* <Link  href={'/login'}>  
<DropdownMenuItem className='cursor-pointer'>Login
  </DropdownMenuItem>
  </Link> */}
export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 sm:hidden">
      <div className="flex items-center justify-around py-2">

        {/* Home */}
        <Link href={'/'}>
        <NavItem
          icon={<Home className="w-5 h-5 cursor-pointer" />}
          label="Home"
          active
        />
        
        </Link>

        {/* Shop All */}
      <Link href={'/products'}>
        <NavItem
          icon={<Grid className="w-5 h-5 cursor-pointer" />}
          label="Shop"
        />

      </Link>



        {/* Cart */}
       <Link href={'/cart'}>
        <NavItem
          icon={<ShoppingCart className="w-5 h-5 cursor-pointer" />}
          label="My Cart"
     
        />
       </Link>



        {/* WhatsApp */}
        <NavItem
  icon={<MessageCircle className="w-5 h-5 cursor-pointer" />}
  label="Support"
  green
  onClick={() => {
    window.open('https://wa.me/201128829775', '_blank')
  }}
/>

      </div>
    </nav>
  )
}

/* ================= ITEM ================= */

function NavItem({
 icon,
  label,
  active,
  badge,
  green,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: string
  green?: boolean
  onClick?: () => void
}) {
    
  return (
  <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-1 text-[10px]"
    >
      {badge && (
        <span className="absolute -top-1 right-1 text-[10px] bg-black text-white rounded-full px-1">
          {badge}
        </span>
      )}

      <div
        className={`
          ${green ? 'text-green-400' : active ? 'text-black' : 'text-gray-500'}
        `}
      >
        {icon}
      </div>

      <span
        className={`
          ${green ? 'text-green-600' : active ? 'text-black' : 'text-gray-500'}
        `}
      >
        {label}
      </span>
    </button>
  )
}
