
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FootballData {
  teams?: any[];
  players?: any[];
  matches?: any[];
  statistics?: any;
  standings?: any[];
  // Add more types as needed
}

export const useFootballData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<FootballData>({});

  const fetchData = async (endpoint: string, params: any = {}) => {
    setIsLoading(true);
    try {
      const response = await supabase.functions.invoke('fetch-football-data', {
        body: { endpoint, params }
      });

      if (response.error) {
        toast.error('Failed to fetch football data');
        throw response.error;
      }

      console.log('Football data response:', response.data);
      setData(response.data);
      
      // Show success message
      toast.success('Football data fetched successfully');
      return response.data;
    } catch (error) {
      console.error('Error fetching football data:', error);
      toast.error('Failed to fetch football data');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    fetchData
  };
};
