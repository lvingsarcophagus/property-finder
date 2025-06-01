// Simple network test for Supabase
"use client"

import { useEffect, useState } from 'react';

export default function NetworkTest() {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const testNetwork = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      setResults(prev => [...prev, `Supabase URL: ${supabaseUrl}`]);
      setResults(prev => [...prev, `Supabase Key: ${supabaseKey ? 'Present' : 'Missing'}`]);
      
      if (!supabaseUrl || !supabaseKey) {
        setResults(prev => [...prev, 'ERROR: Missing environment variables']);
        return;
      }

      // Test basic connectivity to Supabase
      try {
        setResults(prev => [...prev, 'Testing basic connectivity...']);
        
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          method: 'GET',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        });
        
        setResults(prev => [...prev, `Basic connectivity: ${response.status} ${response.statusText}`]);
        
        // Test auth endpoint
        const authResponse = await fetch(`${supabaseUrl}/auth/v1/settings`, {
          method: 'GET',
          headers: {
            'apikey': supabaseKey,
            'Content-Type': 'application/json',
          },
        });
        
        setResults(prev => [...prev, `Auth endpoint: ${authResponse.status} ${authResponse.statusText}`]);
        
        if (authResponse.ok) {
          const authData = await authResponse.json();
          setResults(prev => [...prev, `Auth settings: ${JSON.stringify(authData, null, 2)}`]);
        }
        
      } catch (error) {
        setResults(prev => [...prev, `Network error: ${error}`]);
        console.error('Network test error:', error);
      }
    };
    
    testNetwork();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      <h1>Network Connectivity Test</h1>
      <div>
        {results.map((result, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>{result}</div>
        ))}
      </div>
    </div>
  );
}
