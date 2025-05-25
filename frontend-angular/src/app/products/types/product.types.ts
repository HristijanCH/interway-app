export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  category: string;
}

export interface Product extends ProductFormData {
  id: string;
}
