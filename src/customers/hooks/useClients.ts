import { useState } from "react";
import { personService } from "../../persons/person.service";
import { customerService } from "../customers.service";
import type { CustomerForm } from "../interfaces/customer-form.interface";

export const useCustomers = () => {
  const [loading, setLoading] = useState(false);

  const createCustomer = async (formData: CustomerForm) => {
    try {
      setLoading(true);

      // 1. Crear persona
      const personResponse = await personService.createPerson({
        firstName: formData.first_name,
        lastName: formData.last_name,
        phoneNumber: formData.phone,
        email: formData.email,
      });

      if (!personResponse.success) {
        throw new Error(personResponse.message);
      }

      // 2. Crear cliente
      const customerResponse = await customerService.createClient({
        personId: personResponse.data.id._value,
      });

      if (!customerResponse.success) {
        throw new Error(customerResponse.message);
      }

      return customerResponse;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCustomer,
    loading,
  };
};
