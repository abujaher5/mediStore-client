export interface Medicine {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  manufacturer: string;
  categoryId: string;
  className?: string;
}
