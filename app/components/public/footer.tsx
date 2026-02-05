import * as React from 'react';
import { Link } from 'react-router';

/**
 * Footer component with sector-specific organization.
 * Constrained to max-w-7xl and supports dark mode logo inversion.
 * * @returns {React.JSX.Element} The responsive footer component.
 */
export function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-accent">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/">
              <img
                src="/alliance7.svg"
                alt="Alliance Logo"
                className="h-8 w-auto dark:invert"
              />
            </Link>
            <p className="text-sm leading-6 text-muted-foreground max-w-xs">
              Providing cutting-edge IT infrastructure and advanced geo-physical
              equipment solutions for a transforming world.
            </p>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Sectors
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      to="/services/it-infrastructure"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      IT Infrastructure
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/geophysical"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Geo-Physical
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground">
                  Company
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      to="/about"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Connect</h3>
              <ul className="mt-6 space-y-4">
                <li className="text-sm text-muted-foreground">
                  info@alliancecomputer.co
                </li>
                <li className="text-sm text-muted-foreground">
                  +25191 311 1511
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {currentYear} Alliance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
