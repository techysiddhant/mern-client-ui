import axios from "axios";
import { CouponCodeData } from "../types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
const ORDER_SERVICE_PRFFIX = "/api/order";
export const getCustomer = () => api.get(`${ORDER_SERVICE_PRFFIX}/customer`);
export const addAddress = (customerId: string, address: string) =>
  api.patch(`${ORDER_SERVICE_PRFFIX}/customer/addresses/${customerId}`, {
    address: address,
  });
export const verifyCoupon = (data: CouponCodeData) =>
  api.post(`${ORDER_SERVICE_PRFFIX}/coupons/verify`, data);
