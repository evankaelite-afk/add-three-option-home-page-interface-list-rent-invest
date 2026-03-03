import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2, Building2 } from 'lucide-react';
import ListingAuthGate from '../components/auth/ListingAuthGate';
import ListingForm from '../components/listings/ListingForm';

export default function CreateListingPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const [submittedListingId, setSubmittedListingId] = useState<bigint | null>(null);

  useEffect(() => {
    document.title = 'Create Listing - Preleasehub';
  }, []);

  const handleSuccess = (listingId: bigint) => {
    setSubmittedListingId(listingId);
  };

  const handleCreateAnother = () => {
    setSubmittedListingId(null);
  };

  return (
    <ListingAuthGate>
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <div className="container-custom py-section-sm md:py-section-md">
          <div className="max-w-3xl mx-auto">
            {submittedListingId ? (
              <Card className="shadow-urbanet">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-secondary/10">
                    <CheckCircle2 className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-display-xs">Listing Created Successfully!</CardTitle>
                  <CardDescription>
                    Your property listing has been submitted and is now available.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Listing ID</p>
                    <p className="text-lg font-semibold">{submittedListingId.toString()}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => navigate({ to: '/my-listings' })}
                      className="flex-1"
                      size="lg"
                    >
                      View My Listings
                    </Button>
                    <Button
                      onClick={handleCreateAnother}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      Create Another
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                    <Building2 className="h-4 w-4" />
                    Create Property Listing
                  </div>
                  <h1 className="display-md mb-3">List Your Property</h1>
                  <p className="text-lg text-muted-foreground">
                    Fill in the details below to create your property listing
                  </p>
                </div>
                <ListingForm onSuccess={handleSuccess} />
              </>
            )}
          </div>
        </div>
      </div>
    </ListingAuthGate>
  );
}
