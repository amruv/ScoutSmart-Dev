
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const FOOTBALL_API_KEY = Deno.env.get('FOOTBALL_API_KEY');
const BASE_URL = 'https://v3.football.api-sports.io';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TeamStats {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  stats: {
    matches: number;
    goals: number;
    possession: number;
    // Add more stats as needed
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { endpoint, params } = await req.json();
    console.log(`Fetching data for endpoint: ${endpoint}`, params);

    // Example: Fetch team statistics
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        'x-rapidapi-key': FOOTBALL_API_KEY || '',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch football data');
    }

    const data = await response.json();
    console.log('API Response:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching football data:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
