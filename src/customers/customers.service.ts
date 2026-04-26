import { api } from "../shared/services/api";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

type CustomerFromApi = {
  id: string;
  firstName: string;
  lastName: string;
};

export const customerService = {
  searchCustomers: async (search: string): Promise<Customer[]> => {
    const res = await api.get<ApiResponse<CustomerFromApi[]>>(
      `/customers/search?search=${search}`,
    );
    console.log("RAW BACKEND:", res.data.data);
    return res.data.data.map((c) => ({
      id: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
    }));
  },
};
