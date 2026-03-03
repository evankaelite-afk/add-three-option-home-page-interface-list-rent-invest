import { useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import AdminLoginCta from '../components/admin/AdminLoginCta';
import AccessDeniedScreen from '../components/admin/AccessDeniedScreen';
import AdminWaitlistTable from '../components/admin/AdminWaitlistTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading, isFetched: isAdminFetched } = useIsCallerAdmin();

  const isAuthenticated = !!identity;

  useEffect(() => {
    document.title = 'Admin Dashboard - Preleasehub';
  }, []);

  // Show loading state while checking authentication and admin status
  if (isInitializing || (isAuthenticated && isAdminLoading)) {
    return (
      <div className="container-custom py-section-sm md:py-section-md">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  // Not authenticated - show login CTA
  if (!isAuthenticated) {
    return <AdminLoginCta />;
  }

  // Authenticated but not admin - show access denied
  if (isAdminFetched && !isAdmin) {
    return <AccessDeniedScreen />;
  }

  // Authenticated and admin - show dashboard
  return (
    <div className="container-custom py-section-sm md:py-section-md">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-display-sm md:text-display-md font-display font-bold tracking-tight mb-2">
            Admin Dashboard
          </h1>
          <p className="text-body-lg text-muted-foreground">
            Manage waitlist entries and monitor platform activity
          </p>
        </div>

        {/* Waitlist Section */}
        <Card>
          <CardHeader>
            <CardTitle>Waitlist Entries</CardTitle>
            <CardDescription>
              View and search all early access registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminWaitlistTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
