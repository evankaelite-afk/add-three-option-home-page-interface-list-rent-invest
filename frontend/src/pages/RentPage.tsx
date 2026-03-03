import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Shield, MapPin, CheckCircle2 } from 'lucide-react';
import { rentCopy } from '../content/marketingCopy';

export default function RentPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Rent - Preleasehub';
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-spacing-mobile md:section-spacing-desktop bg-gradient-to-b from-muted/30 to-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Home className="h-4 w-4" />
              For Renters
            </div>
            <h1 className="display-lg mb-6">{rentCopy.hero.headline}</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {rentCopy.hero.subheadline}
            </p>
            <Button size="lg" onClick={() => navigate({ to: '/join' })} className="h-12 px-8">
              {rentCopy.hero.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing-mobile md:section-spacing-desktop">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <h2 className="display-sm mb-12 text-center">{rentCopy.benefits.title}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {rentCopy.benefits.items.map((benefit, index) => (
                <Card key={index} className="shadow-urbanet">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center bg-primary/10">
                      {index === 0 && <MapPin className="h-6 w-6 text-primary" />}
                      {index === 1 && <Shield className="h-6 w-6 text-primary" />}
                      {index === 2 && <CheckCircle2 className="h-6 w-6 text-primary" />}
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

      {/* Features Section */}
      <section className="section-spacing-mobile md:section-spacing-desktop bg-muted/30">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h2 className="display-sm mb-12 text-center">{rentCopy.features.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {rentCopy.features.items.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{feature}</p>
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
            <h2 className="display-sm mb-6">{rentCopy.cta.headline}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {rentCopy.cta.description}
            </p>
            <Button size="lg" onClick={() => navigate({ to: '/join' })} className="h-12 px-8">
              {rentCopy.cta.button}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
