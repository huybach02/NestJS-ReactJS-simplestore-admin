/* eslint-disable @typescript-eslint/no-explicit-any */
import {message} from "antd";
import axiosInstance from "../config/axios";

export const productService = {
  findAll: async () => {
    try {
      return await axiosInstance.get("/products");
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },
};
