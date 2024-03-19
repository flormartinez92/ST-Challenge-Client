import axios from "axios";

export const fetchBrands = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brands`,
      { withCredentials: true, credentials: "include" }
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching brands:", error);
    return [];
  }
};
