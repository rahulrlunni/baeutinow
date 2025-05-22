export interface Product {
  id: string;
  name: string;
  brand: string;
  images: string[][];
  variations: {
    name: string;
    stock: number;
    price: number;
    regular_price: number;
  }[];
  attributes: {
    Size?: string[];
    Gender?: string[];
    Main_Accords?: string[];
    'Main Accords'?: string[];
    Brand?: string[];
    type?: string[];
  };
  min_price: number;
  max_price: number;
  min_reg_price: number;
  max_reg_price: number;
}
