/* eslint-disable @typescript-eslint/no-explicit-any */
import {message} from "antd";
import axiosInstance from "../config/axios";
import {CreateSupplierType} from "../types/supplierType";

export const supplierService = {
  findAll: async () => {
    try {
      return await axiosInstance.get("/suppliers");
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },

  createSupplier: async (data: CreateSupplierType) => {
    try {
      return await axiosInstance.post("/suppliers", data);
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },
  updateSupplier: async (id: string, data: CreateSupplierType) => {
    try {
      return await axiosInstance.patch(`/suppliers/${id}`, data);
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },

  removeSupplier: async (id: string) => {
    try {
      return await axiosInstance.delete(`/suppliers/${id}`);
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },
};
