'use client'
import React, { useContext, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { HeartIcon, Loader, Loader2, ShoppingCart, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { cartcontext } from '@/components/context/Cartcontext'
  import { signOut, useSession } from 'next-auth/react'
import Mobilenavtop from '@/app/(pages)/Mobilenavtop/page'



export default function Navbar() {

const session = useSession()

console.log(session);



const [loadingnav, setLoadingnav] = useState(false)

  
const {isloading , setIsloading , cartdata , setCartdata} = useContext(cartcontext)


  return (
<>



<nav className='text-2xl font-bold py-2 sticky  top-0 left-0 w-full z-50 border-b border-gray-400'>

<div className="container mx-auto">

<div className='flex items-center justify-between'>


<div className='flex items-center gap-4 group cursor-pointer'>






<div className=' w-12 h-12 rounded-full
       bg-blue-700 text-white
      flex items-center justify-center
      font-extrabold text-xl
      transition-all duration-300
      group-hover:scale-110
      group-hover:shadow-lg'>S</div>

<Link href={'/'} className='  text-3xl sm:text-4xl font-extrabold
      text-gray-900 tracking-tight
      transition-all duration-300
      
      group-hover:translate-x-1'>ShopMart</Link>
</div>


  <NavigationMenu className=' hidden sm:flex'>
  <NavigationMenuList>
    
    <NavigationMenuLink asChild>
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
  
   <NavigationMenuLink asChild>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>


         <NavigationMenuLink asChild>
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>


  </NavigationMenuList>
</NavigationMenu>


<div className="flex">

   <Mobilenavtop/>
   
{session.status=='authenticated'&&<Link href={'/wishlistdetails '}>
<HeartIcon/>
</Link>}


    <DropdownMenu>
  <DropdownMenuTrigger>
    <UserIcon className='cursor-pointer'/>
    </DropdownMenuTrigger>


 

  <DropdownMenuContent>
    <DropdownMenuLabel >My Account</DropdownMenuLabel>
   
    <DropdownMenuSeparator />
 
{session.status=='authenticated'?<>

<Link href={'/profile'}>  
<DropdownMenuItem className='cursor-pointer'>
  Profile
  </DropdownMenuItem>
  </Link>
  


<DropdownMenuItem
  className="cursor-pointer"
  onClick={() => {
    document.cookie = "cartOwnerID=; path=/; max-age=0";
    localStorage.clear();
    signOut({ callbackUrl: "/" });
  }}
>
  Logout
</DropdownMenuItem>






</> : 
<>

<Link  href={'/login'}>  
<DropdownMenuItem className='cursor-pointer'>Login
  </DropdownMenuItem>
  </Link>

<Link href={'/register'}>  
<DropdownMenuItem className='cursor-pointer'>Register
  </DropdownMenuItem></Link>

</>


}








  </DropdownMenuContent>
</DropdownMenu>





{session.status=='authenticated'&&<div className=' relative'>
  

<Link href={'/cart'}>
 <span className="text-2xl font-bold text-gray-800 mb-2">
    <ShoppingCart size={20} strokeWidth={1.5} /> 
  </span>
<Badge className="h-4 min-w-5 rounded-full px-1 font-mono tabular-nums absolute bottom-6 bg-[#3f68d8e9]  hover:bg-white hover:text-black transition-colors duration-300">
       {isloading ? <span className='vip-spinner '>  </span> : cartdata?.numOfCartItems }
        </Badge> 

        </Link>


</div>}




</div>



  











</div>



</div>

</nav>











</>
)
}
