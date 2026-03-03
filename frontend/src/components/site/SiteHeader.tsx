import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsCallerAdmin } from '../../hooks/useQueries';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { data: isAdmin } = useIsCallerAdmin();

  const navLinks = [
    { label: 'Listing', path: '/listing' },
    { label: 'Rent', path: '/rent' },
    { label: 'Invest', path: '/invest' },
    { label: 'Properties', path: '/properties' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'About', path: '/about' },
    { label: 'Legal & Compliance', path: '/legal' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/generated/preleasehub-wordmark-transparent.dim_1200x300.png"
              alt="Preleasehub"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                activeProps={{ className: 'text-foreground' }}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground flex items-center gap-1.5"
                activeProps={{ className: 'text-foreground' }}
              >
                <Shield className="h-3.5 w-3.5" />
                Admin
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 md:flex">
            <Button onClick={() => navigate({ to: '/join' })} size="sm" className="h-9 px-5">
              Join Early Access
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground py-2"
                  activeProps={{ className: 'text-foreground' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground py-2 flex items-center gap-1.5"
                  activeProps={{ className: 'text-foreground' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield className="h-3.5 w-3.5" />
                  Admin
                </Link>
              )}
              <Button 
                onClick={() => { 
                  navigate({ to: '/join' }); 
                  setMobileMenuOpen(false); 
                }} 
                size="sm" 
                className="w-full mt-2"
              >
                Join Early Access
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
