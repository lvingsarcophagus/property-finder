// Test file to check Supabase connection
"use client"

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase-client';

export default function TestSupabase() {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const supabase = createBrowserClient();
        console.log('Supabase client created:', supabase);
        setTestResults(prev => [...prev, 'Supabase client created successfully']);
        
        // Test basic connection with auth
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        console.log('Session check result:', { data: sessionData, error: sessionError });
        setTestResults(prev => [...prev, `Session check: ${sessionError ? `Error - ${sessionError.message}` : 'Success'}`]);
        
        // Test a simple auth operation
        const { data: userResponse, error: userError } = await supabase.auth.getUser();
        console.log('User check result:', { data: userResponse, error: userError });
        setTestResults(prev => [...prev, `User check: ${userError ? `Error - ${userError.message}` : 'Success'}`]);
        
        // Try a simple login test with demo credentials
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: 'demo@example.com',
          password: 'demo123'
        });
        console.log('Demo login test:', { data: loginData, error: loginError });
        setTestResults(prev => [...prev, `Demo login test: ${loginError ? `Error - ${loginError.message}` : 'Success'}`]);
        
        setConnectionStatus('Test completed');
        
      } catch (error) {
        console.error('Supabase test error:', error);
        setConnectionStatus('Test failed');
        setTestResults(prev => [...prev, `Unexpected error: ${error}`]);
      }
    };
    
    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Supabase Connection Test</h1>
      <p><strong>Status:</strong> {connectionStatus}</p>
      <div>
        <h3>Test Results:</h3>
        <ul>
          {testResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
      <p><em>Check the browser console for detailed logs.</em></p>
    </div>
  );
}
