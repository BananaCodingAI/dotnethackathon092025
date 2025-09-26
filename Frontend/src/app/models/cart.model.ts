export interface Cart {
  cartId: string;
  items: CartItem[];
  totalBBcoin: number;
}

export interface CartItem {
  cartItemId: string;
  variantId: string;
  productName: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes: string;
}

export interface AddToCartRequest {
  variantId: string;
  quantity: number;
  notes: string;
}