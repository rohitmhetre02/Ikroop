import { useState, useEffect } from 'react';
import { mockAlumni } from '../lib/mockData';

type Alumni = typeof mockAlumni[0];

export function useAlumni() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setAlumni(mockAlumni);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const searchAlumni = async (searchTerm: string, industryFilter?: string, yearFilter?: string) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredAlumni = [...mockAlumni];

      // Apply search filter
      if (searchTerm) {
        filteredAlumni = filteredAlumni.filter(person =>
          person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (person.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (person.position || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply industry filter
      if (industryFilter && industryFilter !== 'all') {
        filteredAlumni = filteredAlumni.filter(person => 
          person.industry?.name === industryFilter
        );
      }

      // Apply graduation year filter
      if (yearFilter && yearFilter !== 'all') {
        filteredAlumni = filteredAlumni.filter(person => 
          person.graduation_year.toString() === yearFilter
        );
      }

      setAlumni(filteredAlumni);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error searching alumni:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    setLoading(true);
    setTimeout(() => {
      setAlumni(mockAlumni);
      setLoading(false);
    }, 300);
  };

  return {
    alumni,
    loading,
    error,
    refetch,
    searchAlumni
  };
}