import { axiosInstance } from "@/lib/axiosInstance";
import { getOTPEndpoint, verifyOTPEndpoint } from "@/lib/end-point";

export const AuthService = {
  getOtp: async ({ phone }: { phone: string }) => {
    try {
      const response = await axiosInstance.post(getOTPEndpoint(), {
        phone,
      });
      return response.data.data;
    } catch (err) {
      console.error("error : ", err);
    }
  },
  verifyOtp: async ({ phone, otp }: { phone: string; otp: string }) => {
    try {
      const response = await axiosInstance.post(verifyOTPEndpoint(), {
        phone,
        otp,
      });
      if (response.data.success === false) {
        return response.data;
      }
      return response.data.data;
    } catch (err) {
      console.error("error : ", err);
    }
  },
};
