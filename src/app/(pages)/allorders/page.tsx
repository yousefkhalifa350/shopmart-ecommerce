'use server'
import { cookies } from 'next/headers'
import { userorders } from '@/interfaces'
import {  DropdownMenuDemo } from '@/components/Combobox/combobox'
import { PackageX } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Allorders() {
  // 1️⃣ نجيب الـ id من cookie

const cookieStore = await cookies()
const cartOwnerID = cookieStore.get('cartOwnerID')?.value

  if (!cartOwnerID) {
    return    <section className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-6 rounded-full">
            <PackageX className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Orders Yet
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Looks like you haven’t placed any orders yet.
          Start shopping and after checkout your orders will appear here.
        </p>

        {/* CTA Button */}
        <Link
    href="/products"
    className="
      px-6 py-3
      rounded-full
      bg-black
      text-white
      font-medium
      hover:bg-[#2453d5e9]
      transition ease-in
    "
  >
  Start shopping
  </Link>

      </div>
    </section>
  }

  // 2️⃣ نضرب الـ API
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwnerID}`,
  
  
  )




// const result = await response.json()
// const orders: userorders[] = result.data || []
  

  // 3️⃣ الريسبونس Array
  const orders: userorders[] = await response.json()

  
  // 4️⃣ نعمل map عادي
  return (
      <section className="relative bg-gray-50 py-5">
  <div className="max-w-5xl px-4">
    <h2 className="text-2xl font-bold mb-8">My Orders</h2>

    {orders.map(order => (
      <div
        key={order.id}
        className="bg-white rounded-2xl border shadow-sm p-6 mb-6"
      >
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="hover-underline-vip text-2xl font-semibold  ">Order</p>
            <h3 className="text-lg font-semibold ">#{order.id}</h3>
            <p className="text-sm text-gray-400">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl px-5 py-3 text-center">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-xl font-bold text-emerald-600 hover-underline-vip ">
              {order.totalOrderPrice} EGP
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-6" />

        {/* Status */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 cursor-pointer">
            Payment: {order.isPaid ? 'Paid' : 'Unpaid'}
          </span>

          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-orange-100 text-orange-700 cursor-pointer">
            Delivery: {order.isDelivered ? 'Delivered' : 'Pending'}
          </span>

          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 cursor-pointer">
            Method: {order.paymentMethodType}
          </span>
        </div>

        {/* Address */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-800 mb-1 hover-underline-vip">
            Shipping Address
          </p>
          <p className="text-sm text-gray-600 ">
            {order.shippingAddress.details}, {order.shippingAddress.city}
          </p>
          <p className="text-sm text-gray-600">
            📞 {order.shippingAddress.phone}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
        
            <DropdownMenuDemo orderitems={order.cartItems}/>
         
        </div>
      </div>
    ))}
  </div>
</section>
 
    )
}
