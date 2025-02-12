/* eslint-disable @typescript-eslint/no-explicit-any */
import {message} from "antd";
import axiosInstance from "../config/axios";
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

  findAllVariants: async (endpoint: string, productId: string) => {
    return await axiosInstance.get(`${endpoint}?productId=${productId}`);
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

  create: async (endpoint: string, data: any) => {
    try {
      return await axiosInstance.post(`${endpoint}`, data);
    } catch (error: any) {
      message.error(error.response.data.message);
      return Promise.reject(error);
    }
  },
  update: async (endpoint: string, id: string, data: any) => {
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
  actionWhenSelected: async (endpoint: string, data: any) => {
    return await axiosInstance.post(`${endpoint}/action-when-selected`, data);
  },
  updateOrderStatus: async (endpoint: string, id: string, data: any) => {
    return await axiosInstance.patch(`${endpoint}/${id}`, data);
  },
  manageWebsite: async (key: string, data: any) => {
    return await axiosInstance.post(`manage-website?key=${key}`, data);
  },
  getManageWebsite: async (key: string) => {
    return await axiosInstance.get(`manage-website?key=${key}`);
  },
  updateManageWebsite: async (key: string, data: any) => {
    return await axiosInstance.patch(`manage-website?key=${key}`, data);
  },
  getDashboard: async () => {
    return await axiosInstance.get("dashboard");
  },
};
