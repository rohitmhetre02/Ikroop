import { useState, useEffect } from 'react';
import { mockAnalytics } from '../lib/mockData';

export function useAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Simulate API call delay but make it shorter to avoid timeout
      await new Promise(resolve => setTimeout(resolve, 300));

      setData(mockAnalytics);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics
  };
}