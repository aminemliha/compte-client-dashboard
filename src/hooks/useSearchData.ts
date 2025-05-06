
import { useState, useEffect } from 'react';
import { fetchAccounts, AccountData } from '../services/mockData';

interface UseSearchDataProps {
  initialPage?: number;
  initialPageSize?: number;
  initialFilters?: Partial<AccountData>;
}

interface SearchDataState {
  accounts: AccountData[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  page: number;
  pageSize: number;
  filters: Partial<AccountData>;
}

export const useSearchData = ({ 
  initialPage = 1, 
  initialPageSize = 10,
  initialFilters = {}
}: UseSearchDataProps = {}) => {
  const [state, setState] = useState<SearchDataState>({
    accounts: [],
    loading: true,
    error: null,
    totalCount: 0,
    page: initialPage,
    pageSize: initialPageSize,
    filters: initialFilters
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, totalCount } = await fetchAccounts(
        state.page, 
        state.pageSize, 
        state.filters
      );
      
      setState(prev => ({
        ...prev,
        accounts: data,
        totalCount,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Erreur lors du chargement des données',
        loading: false
      }));
      console.error('Search data error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [state.page, state.pageSize, state.filters]);

  const setPage = (newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
  };

  const setPageSize = (newPageSize: number) => {
    setState(prev => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  const setFilters = (newFilters: Partial<AccountData>) => {
    setState(prev => ({ ...prev, filters: newFilters, page: 1 }));
  };

  const refreshData = () => {
    fetchData();
  };

  return {
    accounts: state.accounts,
    loading: state.loading,
    error: state.error,
    totalCount: state.totalCount,
    page: state.page,
    pageSize: state.pageSize,
    filters: state.filters,
    setPage,
    setPageSize,
    setFilters,
    refreshData
  };
};
