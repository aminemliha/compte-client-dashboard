
import { useState } from 'react';
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
      // Simulate API call
      setState({
        loading: false,
        error: null,
        data: { data: [], totalCount: 0 },
      });
      return { data: [], totalCount: 0 };
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
      // Simulate API call
      setState({
        loading: false,
        error: null,
        data: null,
      });
      return null;
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
