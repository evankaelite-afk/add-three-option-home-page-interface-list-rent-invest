import { useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { legalCopy } from '../content/marketingCopy';

export default function LegalCompliancePage() {
  useEffect(() => {
    document.title = 'Legal & Compliance - Preleasehub';
  }, []);

  return (
    <div className="bg-background">
      <div className="container-custom py-16 md:py-24">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold font-display md:text-5xl">{legalCopy.title}</h1>
          <p className="text-lg text-muted-foreground">
            Important legal information and compliance policies.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {legalCopy.sections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="text-left text-lg font-semibold font-display">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
