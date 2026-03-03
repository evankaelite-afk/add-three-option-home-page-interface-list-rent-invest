import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import { aboutCopy } from '../content/marketingCopy';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About - Preleasehub';
  }, []);

  return (
    <div className="bg-background">
      <div className="container-custom py-16 md:py-24">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold font-display md:text-5xl">{aboutCopy.title}</h1>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          {/* Mission */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                {aboutCopy.mission}
              </div>
            </CardContent>
          </Card>

          {/* Approach */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">{aboutCopy.approach.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {aboutCopy.approach.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">{aboutCopy.contact.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{aboutCopy.contact.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a
                    href={`mailto:${aboutCopy.contact.email}`}
                    className="text-primary hover:underline"
                  >
                    {aboutCopy.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{aboutCopy.contact.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
