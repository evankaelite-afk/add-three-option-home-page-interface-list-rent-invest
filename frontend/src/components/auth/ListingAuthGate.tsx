import { ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LogIn, Loader2 } from 'lucide-react';

interface ListingAuthGateProps {
  children: ReactNode;
}

export default function ListingAuthGate({ children }: ListingAuthGateProps) {
  const { login, loginStatus, identity, isInitializing } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <div className="container-custom py-section-sm md:py-section-md">
          <div className="max-w-md mx-auto space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <div className="container-custom py-section-sm md:py-section-md">
          <div className="max-w-md mx-auto">
            <Card className="shadow-urbanet">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-primary/10">
                  <LogIn className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-display-xs">Login Required</CardTitle>
                <CardDescription>
                  Please log in to create and manage your property listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  You need to be logged in to access this feature. Create an account or log in to get started.
                </p>
                <Button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full"
                  size="lg"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Log In to Continue
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
}
