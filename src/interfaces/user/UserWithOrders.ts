export interface UserWithOrdersResponse {
    id: string
    name: string
    email: string
    orders: OrderDTO[]
  }
  
  export interface OrderDTO {
    id: string
    items: CartItem[]
    totalPrice: number
    paymentId: string
    status: string
    location: string
    notes: string
    creationDate: string
    lastUpdateDate: string
  }
  
  export interface CartItem {
    id: string
    name: string
    quantity: number
    price: number
  }
  