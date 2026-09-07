export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  manufacturer: string;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
  className?: string;
  category?: {
    id: string;
    name: string;
  };
}

export type TUpdateMedicinePayload = {
  name: string;
  price: number;
  stock: number;
  manufacturer: string;
};
export interface GetMedicineParams {
  search?: string;
}

export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export type TCreateMedicinePayload = {
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  categoryId: string;
  imageUrl: string;
};

export type TMedicineResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  data?: Medicine | null;
};
