import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { listingCopy } from '../content/marketingCopy';

export default function ListingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Listing - Preleasehub';
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-spacing-mobile md:section-spacing-desktop bg-gradient-to-b from-muted/30 to-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
              <Building2 className="h-4 w-4" />
              For Property Owners
            </div>
            <h1 className="display-lg mb-6">{listingCopy.hero.headline}</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {listingCopy.hero.subheadline}
            </p>
            <Button size="lg" onClick={() => navigate({ to: '/listing/create' })} className="h-12 px-8">
              {listingCopy.hero.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing-mobile md:section-spacing-desktop">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <h2 className="display-sm mb-12 text-center">{listingCopy.benefits.title}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {listingCopy.benefits.items.map((benefit, index) => (
                <Card key={index} className="shadow-urbanet">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center bg-secondary/10">
                      {index === 0 && <TrendingUp className="h-6 w-6 text-secondary" />}
                      {index === 1 && <Users className="h-6 w-6 text-secondary" />}
                      {index === 2 && <CheckCircle2 className="h-6 w-6 text-secondary" />}
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-spacing-mobile md:section-spacing-desktop bg-muted/30">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h2 className="display-sm mb-12 text-center">{listingCopy.process.title}</h2>
            <div className="space-y-6">
              {listingCopy.process.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-secondary text-secondary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-mobile md:section-spacing-desktop">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="display-sm mb-6">{listingCopy.cta.headline}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {listingCopy.cta.description}
            </p>
            <Button size="lg" onClick={() => navigate({ to: '/listing/create' })} className="h-12 px-8">
              {listingCopy.cta.button}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
