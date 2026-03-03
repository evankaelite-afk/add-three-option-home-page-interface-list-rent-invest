import { useEffect } from 'react';
import PropertyCard from '../components/properties/PropertyCard';
import { useGetFeaturedProperties } from '../hooks/useQueries';
import { Building2 } from 'lucide-react';

export default function PropertiesPage() {
  const { data: properties, isLoading } = useGetFeaturedProperties();

  useEffect(() => {
    document.title = 'Investment Properties - Preleasehub';
  }, []);

  return (
    <div className="bg-background">
      <div className="border-b border-border bg-muted/30">
        <div className="container-custom py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary mb-4">
              <Building2 className="h-4 w-4" />
              Investment Opportunities
            </div>
            <h1 className="text-display-sm md:text-display-md font-bold font-display">
              Investment Properties
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Explore our curated selection of pre-leased and income-generating real estate opportunities across India.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom section-spacing">
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 animate-pulse bg-muted" />
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id.toString()} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 p-16 text-center">
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg text-muted-foreground">
              No properties available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
