// Product type — erasableSyntaxOnly compliant (no enums)
export type ProductCategory = 'men' | 'women' | 'runners' | 'loungers'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: ProductCategory[]
  badge?: 'new' | 'sale'
  description: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  quantity: number
}

export type FilterCategory = 'all' | ProductCategory

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}
