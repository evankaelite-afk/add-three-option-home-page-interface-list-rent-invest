import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { howItWorksCopy } from '../content/marketingCopy';

export default function HowItWorksPage() {
  useEffect(() => {
    document.title = 'How It Works - Preleasehub';
  }, []);

  return (
    <div className="bg-background">
      <div className="container-custom py-16 md:py-24">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold font-display md:text-5xl">{howItWorksCopy.title}</h1>
          <p className="text-lg text-muted-foreground">
            Understanding fractional real estate ownership and how it works.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          {howItWorksCopy.sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl font-display">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
