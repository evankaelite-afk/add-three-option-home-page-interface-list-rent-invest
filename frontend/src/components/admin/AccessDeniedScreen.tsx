import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert, Home } from 'lucide-react';

export default function AccessDeniedScreen() {
  const navigate = useNavigate();

  return (
    <div className="container-custom py-section-sm md:py-section-md">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-destructive/10">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-display-xs">Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to view this page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                This area is restricted to authorized administrators only. If you believe you should have access, please contact support.
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => navigate({ to: '/' })}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
