
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FootballData {
  teams?: any[];
  players?: any[];
  matches?: any[];
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

      if (response.error) throw response.error;
      
      setData(response.data);
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
