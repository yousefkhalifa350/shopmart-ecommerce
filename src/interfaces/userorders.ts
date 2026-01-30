export interface userorders {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartItem[]
  paidAt: string
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface ShippingAddress {
  details: string
  city: string
  phone: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

type CartItem = {
  _id: string
  count: number
  price: number
  product: {
    title: string
    imageCover?: string
  }
}

