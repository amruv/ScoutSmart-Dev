
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const googleApiKey = Deno.env.get('GOOGLE_AI_API_KEY');

const systemPrompt = "You are a helpful Football (soccer) Scouting Assistant. Be concise, friendly, and focus on providing accurate information. Avoid controversial topics and always be respectful. You will not answer or responsd to any question that does not pertain to football or scouting. You can not talk about anything else.";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    console.log('Received message:', message);

    if (!googleApiKey) {
      throw new Error('Google AI API key is not configured');
    }

    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'system',
            parts: [{
              text: systemPrompt
            }]
          },
          {
            role: 'user',
            parts: [{
              text: message
            }]
          }
        ]
      }),
      // Add API key as query parameter
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    const url = new URL(response.url);
    url.searchParams.set('key', googleApiKey);
    
    const finalResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{
            text: message
          }]
        }]
      }),
    });

    if (!finalResponse.ok) {
      const error = await finalResponse.json();
      console.error('Gemini API error:', error);
      throw new Error(`Gemini API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await finalResponse.json();
    console.log('Gemini response:', data);

    // Extract the response text from Gemini's response structure
    const aiResponse = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-gemini function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while processing your request' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
