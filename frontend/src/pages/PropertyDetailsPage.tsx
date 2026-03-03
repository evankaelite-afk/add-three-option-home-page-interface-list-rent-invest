import { useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, MapPin, Calendar, TrendingUp, Building2, Users, Shield } from 'lucide-react';
import { useGetPropertyById } from '../hooks/useQueries';
import { propertyDetailsCopy } from '../content/marketingCopy';

export default function PropertyDetailsPage() {
  const { propertyId } = useParams({ from: '/properties/$propertyId' });
  const navigate = useNavigate();
  const propertyIdBigInt = propertyId ? BigInt(propertyId) : null;
  const { data: property, isLoading, isError } = useGetPropertyById(propertyIdBigInt);

  useEffect(() => {
    if (property) {
      document.title = `${property.title} - Preleasehub`;
    } else {
      document.title = 'Property Details - Preleasehub';
    }
  }, [property]);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-muted" />
            <div className="h-96 bg-muted" />
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-muted" />
                <div className="h-64 bg-muted" />
              </div>
              <div className="h-96 bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-16">
          <Alert variant="destructive">
            <AlertDescription>
              Property not found. Please check the URL or return to the properties page.
            </AlertDescription>
          </Alert>
          <div className="mt-8">
            <Button onClick={() => navigate({ to: '/properties' })} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Hero Header */}
      <section className="border-b border-border bg-muted/30">
        <div className="container-custom py-12">
          <Button
            onClick={() => navigate({ to: '/properties' })}
            variant="ghost"
            className="mb-6 -ml-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="text-sm">
                {property.assetType}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {property.leaseStatus}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
              {property.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Prime Location</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Long-term Lease</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <span className="font-semibold text-foreground">{property.targetYield}% Target Yield</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom section-spacing">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Image */}
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src="/assets/generated/preleasinghub-hero-property-v2.dim_1400x900.png"
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-secondary" />
                  {propertyDetailsCopy.overview.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {propertyDetailsCopy.overview.description}
                </p>
              </CardContent>
            </Card>

            {/* Key Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <Shield className="h-6 w-6 text-secondary" />
                  {propertyDetailsCopy.highlights.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {propertyDetailsCopy.highlights.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Investment Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <Users className="h-6 w-6 text-secondary" />
                  {propertyDetailsCopy.investmentStructure.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {propertyDetailsCopy.investmentStructure.description}
                </p>
              </CardContent>
            </Card>

            {/* Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display">{propertyDetailsCopy.risks.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {propertyDetailsCopy.risks.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-2xl font-display">
                  {propertyDetailsCopy.financialSnapshot.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Target Yield</span>
                    <span className="text-2xl font-bold font-display text-secondary">
                      {property.targetYield}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Minimum Investment</span>
                    <span className="text-lg font-semibold">
                      ₹{(Number(property.minimumInvestment) / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Asset Type</span>
                    <span className="font-medium">{property.assetType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Lease Status</span>
                    <Badge variant="secondary">{property.leaseStatus}</Badge>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate({ to: '/join' })}
                >
                  {propertyDetailsCopy.cta}
                </Button>

                <Alert className="border-0 bg-muted/50">
                  <AlertDescription className="text-xs text-muted-foreground">
                    Investments are subject to market risks. Please read all documents carefully.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
