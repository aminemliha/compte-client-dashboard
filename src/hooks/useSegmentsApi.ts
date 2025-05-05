
import { useState } from 'react';
import { segmentsApi } from '@/services/api';

// Interface pour un segment
export interface Segment {
  id: number;
  name: string;
  description?: string;
  // Ajoutez d'autres propriétés selon votre modèle de données
}

interface UseSegmentsApiState {
  loading: boolean;
  error: string | null;
  data: Segment[] | null;
}

export const useSegmentsApi = () => {
  const [state, setState] = useState<UseSegmentsApiState>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchSegments = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await segmentsApi.getSegments();
      setState({
        loading: false,
        error: null,
        data: response,
      });
      return response;
    } catch (error: any) {
      setState({
        loading: false,
        error: error.message || 'Une erreur est survenue lors du chargement des segments',
        data: null,
      });
      throw error;
    }
  };

  const fetchSegmentById = async (id: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await segmentsApi.getSegmentById(id);
      setState({
        loading: false,
        error: null,
        data: [response], // On le met dans un tableau pour garder le même format
      });
      return response;
    } catch (error: any) {
      setState({
        loading: false,
        error: error.message || `Une erreur est survenue lors du chargement du segment ${id}`,
        data: null,
      });
      throw error;
    }
  };

  return {
    ...state,
    fetchSegments,
    fetchSegmentById,
  };
};
