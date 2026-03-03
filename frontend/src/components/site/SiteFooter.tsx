import { Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-custom py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <img
              src="/assets/generated/preleasehub-wordmark-transparent.dim_1200x300.png"
              alt="Preleasehub"
              className="mb-4 h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Co-Own Income-Generating Real Estate. Invest in professionally managed rental properties and hotels across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/listing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Listing
                </Link>
              </li>
              <li>
                <Link to="/rent" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rent
                </Link>
              </li>
              <li>
                <Link to="/invest" className="text-muted-foreground hover:text-foreground transition-colors">
                  Invest
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-muted-foreground hover:text-foreground transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Legal & Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:support@preleasehub.com" className="hover:text-foreground transition-colors">
                  support@preleasehub.com
                </a>
              </li>
              <li>India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
          <p>© 2026 Preleasehub. All rights reserved.</p>
          <p>
            Built with <Heart className="inline h-4 w-4 text-secondary" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
