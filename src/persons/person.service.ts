import type { CreatePersonRequest } from "../customers/interfaces/person-request.interface";
import { api } from "../shared/services/api";

const API_URL = "/persons"; // 👈 importante

export const personService = {
  createPerson: async (data: CreatePersonRequest) => {
    const response = await api.post(API_URL, data);
    return response.data;
  },
};
