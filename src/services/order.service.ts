export const orderService = {
  getMyOrders: async function () {
    try {
      const res = await fetch("http://localhost:5000/api/orders/my-orders", {
        credentials: "include",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },
};
