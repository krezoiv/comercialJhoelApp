import { useEffect, useState, useCallback } from "react";

import { expenseService } from "../services/expense.service";

import type { ExpenseDetail } from "../interfaces/expense-detail.interface";

export const useExpenseDetail = (customerId: string, isOpen: boolean) => {
  const [data, setData] = useState<ExpenseDetail[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await expenseService.getExpenseDetailsByCustomer(customerId);

      setData(res);
    } catch (error) {
      console.error("🔥 ERROR DETAILS:", error);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [fetchData, isOpen]);

  return {
    data,
    loading,
    refetch: fetchData,
  };
};
