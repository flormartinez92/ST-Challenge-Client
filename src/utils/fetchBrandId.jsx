import axios from "axios";

export const fetchBrandId = async (brandId) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brands/${brandId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching brands:", error);
    return null;
  }
};
