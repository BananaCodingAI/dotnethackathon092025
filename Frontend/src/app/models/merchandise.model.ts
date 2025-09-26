export interface Merchandise {
  merchandiseId: string;
  name: string;
  description: string;
  category: string;
  basePriceBBcoin: number;
  imageUrl: string;
  vendor: Vendor;
  variants: MerchandiseVariant[];
}

export interface MerchandiseVariant {
  variantId: string;
  variantLabel: string;
  vendorSku: string;
  priceBBcoin: number;
}

export interface Vendor {
  vendorId: string;
  name: string;
  contactEmail: string;
}