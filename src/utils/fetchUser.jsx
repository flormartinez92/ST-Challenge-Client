import axios from "axios";

export const fetchUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("User is not authenticated:", error);
    return null;
  }
};
