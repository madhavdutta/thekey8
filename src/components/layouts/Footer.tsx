// components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                TheKey8
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your trusted partner in finding the perfect mortgage solution in the UAE.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Our Services', 'How It Works', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                'Mortgage Calculator',
                'Market Insights',
                'Pre-Qualification',
                'FAQs'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: 'hello@thekey8.com' },
                { icon: Phone, text: '+971 50 123 4567' },
                { icon: MapPin, text: 'Dubai, United Arab Emirates' }
              ].map(({ icon: Icon, text }, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} TheKey8. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}