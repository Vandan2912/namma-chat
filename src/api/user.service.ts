import { axiosInstance } from "@/lib/axiosInstance";
import { getUserInfoEndpoint } from "@/lib/end-point";

export const UserService = {
  getDetails: async ({ phone }: { phone: string }) => {
    try {
      const response = await axiosInstance.get(getUserInfoEndpoint());
      return response.data;
    } catch (err) {
      console.error("error : ", err);
    }
  },
  getChatList: async () => {
    try {
      const response = await axiosInstance.get(getUserInfoEndpoint());
      return response.data;
    } catch (err) {
      console.error("error : ", err);
    }
  },
};
