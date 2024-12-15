/* eslint-disable @typescript-eslint/no-explicit-any */
import {message} from "antd";
import axiosInstance from "../config/axios";
import {CreateSupplierType} from "../types/supplierType";
import {CategoryType} from "../types/categoryType";

export const baseService = {
  findAll: async (
    endpoint: string,
    page: number = 1,
    limit: number = 10,
    query?: any
  ) => {
    try {
      if (query) {
        return await axiosInstance.get(
          `${endpoint}?page=${page}&limit=${limit}&query=${JSON.stringify(
            query
          )}`
        );
      } else {
        return await axiosInstance.get(
          `${endpoint}?page=${page}&limit=${limit}`
        );
      }
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },

  getCategoriesBySuperCategory: async (superCategoryId: string) => {
    const response = await axiosInstance.get(
      `categories/by-super-category/${superCategoryId}`
    );

    return response.data.map((category: CategoryType) => ({
      label: category.name,
      value: category._id,
    }));
  },

  create: async (endpoint: string, data: CreateSupplierType) => {
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
  download: async (endpoint: string, exportFields: any) => {
    try {
      return await axiosInstance.post(`${endpoint}/download`, exportFields);
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },
};
