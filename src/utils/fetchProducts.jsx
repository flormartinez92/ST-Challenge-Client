import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      { withCredentials: true, credentials: "include" }
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching brands:", error);
    return [];
  }
};
