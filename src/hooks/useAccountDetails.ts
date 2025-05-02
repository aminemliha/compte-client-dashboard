
import { useState, useEffect } from 'react';
import { fetchAccountById, AccountData } from '../services/mockData';

interface UseAccountDetailsState {
  account: AccountData | null;
  loading: boolean;
  error: string | null;
}

export const useAccountDetails = (accountId: number | null) => {
  const [state, setState] = useState<UseAccountDetailsState>({
    account: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    if (accountId === null) return;
    
    const loadAccountDetails = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const accountData = await fetchAccountById(accountId);
        
        if (!accountData) {
          setState({
            account: null,
            loading: false,
            error: `Compte avec ID ${accountId} non trouvé`
          });
          return;
        }
        
        setState({
          account: accountData,
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          account: null,
          loading: false,
          error: 'Erreur lors du chargement des détails du compte'
        });
        console.error('Account details error:', error);
      }
    };
    
    loadAccountDetails();
  }, [accountId]);

  return state;
};
