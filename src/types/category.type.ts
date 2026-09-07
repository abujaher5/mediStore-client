export interface Categories {
  name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type TCreateCategoryPayload = {
  name: string;
};

export type TCategoryResponse = {
  success: boolean;
  message?: string;
  data?: Categories | null;
};
