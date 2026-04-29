export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  manufacturer: string;
  categoryId: string;
  className?: string;
}
export interface GetMedicineParams {
  search?: string;
}

export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
