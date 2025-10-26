import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm mt-auto w-full">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <img src="/LearnHub-Logo.svg" alt="LearnHub" className="h-8 w-8" />
              <span className="bg-gradient-primary bg-clip-text text-transparent">LearnHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering learners worldwide with high-quality online courses and certifications.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-muted-foreground hover:text-primary transition-colors">
                  Certificates
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted-foreground hover:text-primary transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted-foreground hover:text-primary transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-muted-foreground hover:text-primary transition-colors">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-center md:text-left">&copy; {currentYear} LearnHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
