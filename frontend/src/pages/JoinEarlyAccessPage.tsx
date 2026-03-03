import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useJoinWaitlist } from '../hooks/useQueries';
import { joinCopy } from '../content/marketingCopy';

export default function JoinEarlyAccessPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [investorType, setInvestorType] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  const joinWaitlist = useJoinWaitlist();

  useEffect(() => {
    document.title = 'Join Early Access - Preleasehub';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await joinWaitlist.mutateAsync({
        name,
        email,
        phoneNumber,
        investorType: investorType || null,
      });
      setShowSuccess(true);
      setName('');
      setEmail('');
      setPhoneNumber('');
      setInvestorType('');
    } catch (error) {
      console.error('Failed to join waitlist:', error);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-background">
        <div className="container-custom py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <Alert className="border-primary bg-primary/5">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <AlertDescription className="ml-2 text-lg">{joinCopy.successMessage}</AlertDescription>
            </Alert>
            <div className="mt-8 text-center">
              <Button onClick={() => setShowSuccess(false)} variant="outline">
                Submit Another Entry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container-custom py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-display">{joinCopy.headline}</CardTitle>
              <CardDescription>
                Be the first to know about new investment opportunities and exclusive deals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investorType">Investor Type (Optional)</Label>
                  <Select value={investorType} onValueChange={setInvestorType}>
                    <SelectTrigger id="investorType">
                      <SelectValue placeholder="Select investor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Investor</SelectItem>
                      <SelectItem value="hni">High Net Worth Individual (HNI)</SelectItem>
                      <SelectItem value="institutional">Institutional Investor</SelectItem>
                      <SelectItem value="family-office">Family Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {joinWaitlist.isError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Failed to join waitlist. Please try again.
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={joinWaitlist.isPending}
                >
                  {joinWaitlist.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    joinCopy.cta
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
