
import { useState } from 'react';
import { accountsApi } from '@/services/api';
import { AccountData } from '@/services/mockData';

interface UseAccountsApiState {
  loading: boolean;
  error: string | null;
  data: any;
}

export const useAccountsApi = () => {
  const [state, setState] = useState<UseAccountsApiState>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchAccounts = async (page = 1, pageSize = 10, filters = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await accountsApi.getAccounts(page, pageSize, filters);
      setState({
        loading: false,
        error: null,
        data: response,
      });
      return response;
    } catch (error: any) {
      setState({
        loading: false,
        error: error.message || 'Une erreur est survenue lors du chargement des données',
        data: null,
      });
      throw error;
    }
  };

  const fetchAccountById = async (id: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await accountsApi.getAccountById(id);
      setState({
        loading: false,
        error: null,
        data: response,
      });
      return response;
    } catch (error: any) {
      setState({
        loading: false,
        error: error.message || `Une erreur est survenue lors du chargement du compte ${id}`,
        data: null,
      });
      throw error;
    }
  };

  return {
    ...state,
    fetchAccounts,
    fetchAccountById,
  };
};
