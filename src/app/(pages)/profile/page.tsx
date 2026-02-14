'use client'
import React, { use, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { Package } from 'lucide-react'


import Address from '@/components/AdressCompChange/address';
import { useRef } from 'react';
import { GetUserToken } from '@/app/Helpers/GetUserToken';
import { AddressInterface, AddressResponselogged } from '@/interfaces';






export default function profile() {
const [mounted, setMounted] = useState(false)

const [idaddress, setIdaddress] = useState<string|null>(null)

const [addresses, setAddresses] = useState<AddressInterface[]>([]);

const [loadingAddressId, setLoadingAddressId] = useState<string | null>(null);

const shown = useRef(false);  

  
  const mysession = useSession()
useEffect(() => {
  if (mysession.status === 'authenticated'&&!shown.current) {
    toast.success(`Welcome back ${mysession.data.user.name} 👋 Manage your personal details.`,{duration:2000})
    shown.current=true  
  }
}, [])

console.log(mysession);

useEffect(() => {
  setMounted(true)
}, [])




async function getloggeduseraddress () { 

const token = await GetUserToken()

const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses',{

headers:{token:token!}
})

const data: { data: AddressInterface[] } = await response.json();




const addresses = data?.data ?? [];

if (addresses.length > 0) {
  setIdaddress(addresses[0]._id);
} else {
  setIdaddress(null);
}

return addresses;
}



async function removerloggeduseraddress(id:any){

   setLoadingAddressId(id);

const token = await GetUserToken()
  const response  = await fetch(' https://ecommerce.routemisr.com/api/v1/addresses/'+id , 

{headers:
  
  {token:token!},

method:'DELETE'



} 



  )


const data = await response.json()


setLoadingAddressId(null);
toast.success('Address deleted successfully ')





}




 
useEffect(()=>
  
  
  {

async function run() {

  const address = await getloggeduseraddress();

setAddresses(address);


  
}

run()

  },[getloggeduseraddress])


if (!mounted) return null

  return (
<>
<div className="min-h-screen bg-slate-50 py-10 px-4">
  <div className="max-w-6xl mx-auto">

    {/* ===== User Info Card ===== */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row items-center gap-6 mb-10 text-center sm:text-left">

      <div className="flex items-center justify-center">
        <img
          src="/avataaars.svg"
          alt="photo-boy"
          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-60 lg:h-60 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center sm:items-start">
        <h1 className="text-2xl font-semibold text-slate-900">
          {mysession.status === 'authenticated' && mysession.data.user.name || "User Name"}
        </h1>

        <h2 className="text-sm sm:text-base font-medium text-slate-600 mt-1">
          {mysession.status === 'authenticated' && mysession.data.user.email || "email@example.com"}
        </h2>

        <p className="text-slate-500 text-sm mt-2">
          Manage your account settings and saved addresses
        </p>
      </div>

    </div>
    {/* ===== End User Info Card ===== */}


    {/* ===== My Orders Card (المضاف) ===== */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-10">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-4">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-xl">
            📦
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              My Orders
            </h3>
            <p className="text-sm text-slate-500">
              View all your previous orders
            </p>
          </div>
        </div>

      <Link
  href="/allorders"
  className="
    inline-flex items-center gap-2
    rounded-full
    px-6 py-2
    text-sm font-medium
    text-slate-600
    bg-slate-50
    hover:bg-slate-100
    hover:shadow-sm
    transition-all duration-300
  "
>
  View Orders →
</Link>
      </div>
    </div>
    {/* ===== End My Orders Card ===== */}


    {/* ===== Addresses Section ===== */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6"></h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl h-48 transition-[box-shadow,border-color] duration-300 ease-out
        hover:border-[#5875c3aa]
        hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
          <div className="text-4xl text-slate-400 group-hover:text-orange-400">
            +
          </div>
          <span className="mt-2 text-sm font-medium text-slate-600 group-hover:text-orange-500">
            < Address setallAddresses={setAddresses} />  
          </span>
        </div>

        {addresses.map((addresss) => (
          <div
            key={addresss._id}
            className="
              relative
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              h-52
              flex flex-col justify-between
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:border-red-200
            "
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800">
                {addresss.name}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {addresss.details}
                <br />
                <span className="font-medium text-slate-700">
                  {addresss.city}
                </span>
              </p>

              <p className="text-sm text-slate-500 flex items-center gap-2">
                📞 {addresss.phone}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => removerloggeduseraddress(addresss._id)}
                disabled={loadingAddressId === addresss._id}
                className="
                  flex items-center gap-2
                  px-4 py-2
                  rounded-full
                  border border-red-200
                  text-red-600 text-sm font-medium
                  transition-all duration-300
                  hover:bg-red-50 hover:border-red-300
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {loadingAddressId === addresss._id ? (
                  <span className="vip-spinner"></span>
                ) : (
                  <>
                    🗑️
                    <span className='cursor-pointer'>Delete</span>
                  </>
                )}
              </button>
            </div>

            <div className="
              absolute bottom-0 left-6 right-6 h-[2px]
              bg-gradient-to-r from-transparent via-red-400 to-transparent
              opacity-0 hover:opacity-100 transition
            " />
          </div>
        ))}

      </div>
    </div>
    {/* ===== End Addresses Section ===== */}

  </div>
</div>





</>
  )
}



