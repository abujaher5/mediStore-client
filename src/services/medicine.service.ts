import { env } from "@/env";

const API_URL = env.API_URL;

export const medicineService = {
  getAllMedicines: async function () {
    try {
      // const url = new URL(`${API_URL}/medicines`);

      const res = await fetch(`${API_URL}/medicines`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },
};
