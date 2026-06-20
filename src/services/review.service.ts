const API_URL = "http://localhost:5000/api";

export const reviewService = {
  createReview: async (payload: { quote: string; designation: string }) => {
    const res = await fetch(`${API_URL}/reviews/create-review`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  },

  getAllReviews: async () => {
    const res = await fetch(`${API_URL}/reviews/all-reviews`, {
      cache: "no-store",
    });

    return res.json();
  },
};
