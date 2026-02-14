// 'use client'

// import { useSession } from 'next-auth/react'
// import { useEffect } from 'react'

// export default function ClearWishlistOnLogout() {
//   const { status } = useSession()

//   useEffect(() => {
//     if (status !== 'authenticated') {
//       Object.keys(localStorage).forEach((key) => {
//         if (key.startsWith('wishlist-')) {
//           localStorage.removeItem(key)
//         }
//       })
//     }
//   }, [status])

//   return null
// }