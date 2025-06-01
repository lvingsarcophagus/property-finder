// Test signup and login flow
"use client"

import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase-client';

export default function AuthTest() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('testpassword123');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient();

  const testSignup = async () => {
    setIsLoading(true);
    setResults(prev => [...prev, 'Testing signup...']);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        setResults(prev => [...prev, `Signup error: ${error.message}`]);
      } else {
        setResults(prev => [...prev, `Signup success: ${JSON.stringify(data, null, 2)}`]);
      }
    } catch (error) {
      setResults(prev => [...prev, `Signup exception: ${error}`]);
    }
    
    setIsLoading(false);
  };

  const testLogin = async () => {
    setIsLoading(true);
    setResults(prev => [...prev, 'Testing login...']);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setResults(prev => [...prev, `Login error: ${error.message}`]);
      } else {
        setResults(prev => [...prev, `Login success: ${JSON.stringify(data, null, 2)}`]);
      }
    } catch (error) {
      setResults(prev => [...prev, `Login exception: ${error}`]);
    }
    
    setIsLoading(false);
  };

  const checkSession = async () => {
    setResults(prev => [...prev, 'Checking session...']);
    
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setResults(prev => [...prev, `Session error: ${error.message}`]);
      } else {
        setResults(prev => [...prev, `Session: ${JSON.stringify(data, null, 2)}`]);
      }
    } catch (error) {
      setResults(prev => [...prev, `Session exception: ${error}`]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Authentication Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: '5px', padding: '5px' }}
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: '5px', padding: '5px' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={testSignup} disabled={isLoading} style={{ margin: '5px', padding: '10px' }}>
          Test Signup
        </button>
        <button onClick={testLogin} disabled={isLoading} style={{ margin: '5px', padding: '10px' }}>
          Test Login
        </button>
        <button onClick={checkSession} disabled={isLoading} style={{ margin: '5px', padding: '10px' }}>
          Check Session
        </button>
      </div>

      <div style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '10px' }}>
        {results.map((result, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>{result}</div>
        ))}
      </div>
    </div>
  );
}
