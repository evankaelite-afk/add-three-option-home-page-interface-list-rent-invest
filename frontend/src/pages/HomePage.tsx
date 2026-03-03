import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, ArrowRight, TrendingUp, Shield, Users, Building2, Home, Key, TrendingUpIcon } from 'lucide-react';
import PropertyCard from '../components/properties/PropertyCard';
import { useGetFeaturedProperties } from '../hooks/useQueries';
import { homeCopy } from '../content/marketingCopy';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: properties, isLoading } = useGetFeaturedProperties();

  useEffect(() => {
    document.title = 'Preleasehub - Co-Own Income-Generating Real Estate';
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Urbanet Style */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-background to-background" />
        <div className="container-custom relative section-spacing">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
                    <TrendingUp className="h-4 w-4" />
                    Asset-Backed Investments
                  </span>
                </div>
                <h1 className="text-display-sm md:text-display-md lg:text-display-lg font-bold font-display text-foreground leading-none">
                  {homeCopy.hero.headline}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                  {homeCopy.hero.subheadline}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button 
                  size="lg" 
                  onClick={() => navigate({ to: '/properties' })}
                  className="text-base h-12 px-8"
                >
                  {homeCopy.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate({ to: '/join' })}
                  className="text-base h-12 px-8"
                >
                  {homeCopy.hero.ctaSecondary}
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-secondary" />
                  <span>Transparent structures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-secondary" />
                  <span>Professionally managed</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src="/assets/generated/hero-urbanet-style.dim_1600x900.png"
                  alt="Premium real estate property"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 shadow-urbanet-lg hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-secondary/10">
                    <Building2 className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-display">8.5%</p>
                    <p className="text-sm text-muted-foreground">Target Yield</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Option Interface: List, Rent, Invest */}
      <section className="bg-muted/30 border-y border-border">
        <div className="container-custom section-spacing">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
                Choose Your Path
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you own property, need a place to live, or want to invest — we've got you covered
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {/* List Option */}
              <button
                onClick={() => navigate({ to: '/listing' })}
                className="group relative bg-card p-8 shadow-urbanet transition-all hover:shadow-urbanet-lg hover:-translate-y-1 text-left"
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center bg-secondary/10 transition-colors group-hover:bg-secondary/20">
                    <Home className="h-7 w-7 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display">List</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Own a property? List it with us and reach qualified tenants and investors.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-secondary group-hover:gap-3 transition-all">
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>

              {/* Rent Option */}
              <button
                onClick={() => navigate({ to: '/rent' })}
                className="group relative bg-card p-8 shadow-urbanet transition-all hover:shadow-urbanet-lg hover:-translate-y-1 text-left"
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center bg-secondary/10 transition-colors group-hover:bg-secondary/20">
                    <Key className="h-7 w-7 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display">Rent</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Looking for a place? Browse verified properties with transparent pricing.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-secondary group-hover:gap-3 transition-all">
                    <span>Find a Home</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>

              {/* Invest Option */}
              <button
                onClick={() => navigate({ to: '/invest' })}
                className="group relative bg-card p-8 shadow-urbanet transition-all hover:shadow-urbanet-lg hover:-translate-y-1 text-left"
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center bg-secondary/10 transition-colors group-hover:bg-secondary/20">
                    <TrendingUpIcon className="h-7 w-7 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display">Invest</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Build wealth through fractional ownership of income-generating real estate.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-secondary group-hover:gap-3 transition-all">
                    <span>Start Investing</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-muted/30">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold font-display text-foreground">₹50Cr+</p>
              <p className="mt-2 text-sm text-muted-foreground">Assets Under Management</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold font-display text-foreground">500+</p>
              <p className="mt-2 text-sm text-muted-foreground">Investors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold font-display text-foreground">12</p>
              <p className="mt-2 text-sm text-muted-foreground">Properties</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold font-display text-foreground">8.2%</p>
              <p className="mt-2 text-sm text-muted-foreground">Avg. Yield</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background">
        <div className="container-custom section-spacing">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
              {homeCopy.howItWorks.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple, transparent process to start earning passive income from real estate
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {homeCopy.howItWorks.steps.map((step, index) => (
              <div key={index} className="group relative">
                <div className="flex flex-col items-start text-left space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center bg-secondary/10 transition-colors group-hover:bg-secondary/20">
                    <img
                      src={`/assets/generated/icon-${
                        ['select-property', 'buy-fraction', 'we-manage', 'earn-income'][index]
                      }-v2.dim_256x256.png`}
                      alt={step.title}
                      className="h-10 w-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold font-display text-muted-foreground/30">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-semibold font-display">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-muted/30">
        <div className="container-custom section-spacing">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-3">
                {homeCopy.featuredProperties.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                Curated selection of income-generating properties
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate({ to: '/properties' })}
              className="self-start md:self-auto"
            >
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 animate-pulse bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {properties?.slice(0, 3).map((property) => (
                <PropertyCard key={property.id.toString()} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Preleasehub */}
      <section className="bg-background">
        <div className="container-custom section-spacing">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
                {homeCopy.whyUs.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We make real estate investing accessible, transparent, and hassle-free for modern investors.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {homeCopy.whyUs.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary transition-transform group-hover:scale-110" />
                    <p className="text-base leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src="/assets/generated/preleasinghub-hero-property-v2.dim_1400x900.png"
                  alt="Real estate investment"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Disclaimer */}
      <section className="border-y border-border bg-muted/30">
        <div className="container-custom section-spacing-sm">
          <Alert className="mx-auto max-w-4xl border-0 bg-transparent">
            <AlertDescription className="text-center text-sm text-muted-foreground">
              {homeCopy.compliance.disclaimer}
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-custom section-spacing text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
              {homeCopy.finalCta.headline}
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Join our waitlist to get exclusive access to upcoming investment opportunities
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate({ to: '/join' })}
              className="text-base h-12 px-8"
            >
              {homeCopy.finalCta.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
