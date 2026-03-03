import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';
import type { Property } from '../../backend';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();

  const formatCurrency = (amount: bigint) => {
    const numAmount = Number(amount);
    if (numAmount >= 10000000) {
      return `₹${(numAmount / 10000000).toFixed(1)} Cr`;
    } else if (numAmount >= 100000) {
      return `₹${(numAmount / 100000).toFixed(0)} Lakhs`;
    }
    return `₹${numAmount.toLocaleString('en-IN')}`;
  };

  return (
    <Card className="group flex h-full flex-col border-0 shadow-urbanet transition-all hover:shadow-urbanet-lg overflow-hidden">
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src="/assets/generated/preleasinghub-hero-property-v2.dim_1400x900.png"
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs px-2.5 py-0.5">
            {property.assetType}
          </Badge>
          <Badge variant="outline" className="text-xs px-2.5 py-0.5">
            {property.leaseStatus}
          </Badge>
        </div>
        <CardTitle className="text-xl font-display leading-tight line-clamp-2">{property.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center gap-2 rounded-sm bg-secondary/10 p-3">
          <TrendingUp className="h-5 w-5 text-secondary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Target Yield</p>
            <p className="text-lg font-bold font-display text-secondary">
              {property.targetYield.toFixed(1)}% p.a.*
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Minimum Investment</p>
          <p className="text-xl font-semibold font-display">{formatCurrency(property.minimumInvestment)}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          onClick={() => navigate({ to: '/properties/$propertyId', params: { propertyId: property.id.toString() } })}
          className="w-full group/btn"
          variant="outline"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}

