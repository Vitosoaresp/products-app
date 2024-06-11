import { SortOrder } from "mongoose";

export interface IFindAllParams<T> {
  search?: string;
  perPage?: string;
  page?: string;
  orderBy?: keyof T;
  sort?: SortOrder;
}

export interface IPaginationResponse<T> {
  data: T[];
  total: number;
}
