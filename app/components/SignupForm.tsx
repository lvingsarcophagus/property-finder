"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { toast } from '@/components/ui/use-toast'; // Import toast for notifications
import { Chrome } from 'lucide-react'; // Example icon for Google

export default function SignupForm() {
  // const [name, setName] = useState(''); // Name can be collected after OAuth or from provider
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const { signUp, signInWithOAuth } = useAuth(); // Get signUp and signInWithOAuth from context

  const handleEmailPasswordSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    setError(null);
    try {
      const { error: signUpError } = await signUp(email, password);
      if (signUpError) {
        setError(signUpError.message);
        toast({
          title: "Signup Failed",
          description: signUpError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup Successful",
          description: "Please check your email to verify your account.",
        });
        // router.push('/dashboard'); // Redirect after email verification usually
        // Or redirect to a page saying "check your email"
        router.push('/login?message=check-email');
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      toast({
        title: "Signup Error",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleOAuthSignup = async (provider: 'google' | 'github') => { // Add more providers as needed
    setLoading(true);
    setError(null);
    try {
      await signInWithOAuth(provider);
      // Supabase handles redirection to the provider and then back to your app.
      // The onAuthStateChange listener in AuthContext will handle the session.
      // No immediate redirect here, Supabase handles it.
    } catch (err: any) {
      setError(err.message || `Failed to sign up with ${provider}.`);
      toast({
        title: `OAuth Signup Error (${provider})`,
        description: err.message || `Failed to sign up with ${provider}.`,
        variant: "destructive",
      });
      setLoading(false); // Only set loading false if there's an error before redirect
    }
    // setLoading(false) // Typically, the page will redirect before this is hit.
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your PropertyFinder account</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleEmailPasswordSignup}>
          <div className="grid w-full items-center gap-4">
            {/* Name field can be removed if relying on OAuth or post-signup profile setup
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up with Email'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4"> {/* Or grid-cols-2 for multiple OAuth providers */}
          <Button
            variant="outline"
            onClick={() => handleOAuthSignup('google')}
            disabled={loading}
            className="w-full"
          >
            <Chrome className="mr-2 h-4 w-4" /> {/* Replace with actual Google icon if available */}
            {loading ? 'Redirecting...' : 'Sign Up with Google'}
          </Button>
          {/* Add more OAuth provider buttons here if needed, e.g., GitHub
          <Button
            variant="outline"
            onClick={() => handleOAuthSignup('github')}
            disabled={loading}
            className="w-full"
          >
            {/* <GitHubIcon className="mr-2 h-4 w-4" /> * /}
            {loading ? 'Redirecting...' : 'Sign Up with GitHub'}
          </Button>
          */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center mt-4 px-0">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Button variant="link" onClick={() => router.push('/login')} className="p-0 h-auto">
            Login
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}

