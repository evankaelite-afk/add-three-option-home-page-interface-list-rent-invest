import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMyListings } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, Plus, AlertCircle, Package } from 'lucide-react';
import ListingAuthGate from '../components/auth/ListingAuthGate';

export default function MyListingsPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: listings, isLoading, error } = useGetMyListings();

  useEffect(() => {
    document.title = 'My Listings - Preleasehub';
  }, []);

  return (
    <ListingAuthGate>
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <div className="container-custom py-section-sm md:py-section-md">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="display-md mb-2">My Listings</h1>
                <p className="text-lg text-muted-foreground">
                  Manage your property listings
                </p>
              </div>
              <Button onClick={() => navigate({ to: '/listing/create' })} size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Create New Listing
              </Button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-64" />
                      <Skeleton className="h-4 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-48 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load listings: {error instanceof Error ? error.message : 'Unknown error'}
                </AlertDescription>
              </Alert>
            )}

            {/* Empty State */}
            {!isLoading && !error && listings && listings.length === 0 && (
              <Card className="shadow-urbanet">
                <CardContent className="py-16 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-muted">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Listings Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't created any property listings yet. Get started by creating your first listing.
                  </p>
                  <Button onClick={() => navigate({ to: '/listing/create' })} size="lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Listing
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Listings Grid */}
            {!isLoading && !error && listings && listings.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {listings.map((listing) => (
                  <Card key={listing.id.toString()} className="shadow-urbanet overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{listing.title}</CardTitle>
                          <CardDescription className="mt-1">
                            ID: {listing.id.toString()}
                          </CardDescription>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="text-lg font-semibold">₹{listing.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Images */}
                      {listing.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {listing.images.slice(0, 3).map((imageBytes, idx) => {
                            const blob = new Blob([new Uint8Array(imageBytes)], { type: 'image/jpeg' });
                            const imageUrl = URL.createObjectURL(blob);
                            return (
                              <div key={idx} className="aspect-square bg-muted overflow-hidden">
                                <img
                                  src={imageUrl}
                                  alt={`${listing.title} - Image ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                  onLoad={() => URL.revokeObjectURL(imageUrl)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {listing.description}
                      </p>
                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {listing.images.length} {listing.images.length === 1 ? 'photo' : 'photos'}
                        </span>
                        <span>
                          Created {new Date(Number(listing.createdAt) / 1000000).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ListingAuthGate>
  );
}
