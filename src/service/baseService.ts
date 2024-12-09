/* eslint-disable @typescript-eslint/no-explicit-any */
import {message} from "antd";
import axiosInstance from "../config/axios";
import {CreateSupplierType} from "../types/supplierType";

export const baseService = {
  findAll: async (endpoint: string, page: number = 1, limit: number = 10) => {
    try {
      return await axiosInstance.get(`${endpoint}?page=${page}&limit=${limit}`);
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },

  create: async (endpoint: string, data: CreateSupplierType) => {
    console.log(endpoint, data);
    try {
      return await axiosInstance.post(`${endpoint}`, data);
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },
  update: async (endpoint: string, id: string, data: CreateSupplierType) => {
    try {
      return await axiosInstance.patch(`${endpoint}/${id}`, data);
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },

  remove: async (endpoint: string, id: string) => {
    try {
      return await axiosInstance.delete(`${endpoint}/${id}`);
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },
};
