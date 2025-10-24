import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GraduationCap, Search, User, LogOut, LayoutDashboard, HeadphonesIcon, Heart, ShoppingBag, FileCheck, Menu, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    // TODO: Implement logout logic when authentication is added
    console.log("Logout clicked");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between gap-2">
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10 hover:text-primary">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img src="/LearnHub-Logo.svg" alt="LearnHub" className="h-7 w-7" />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">LearnHub</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  to="/courses"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Courses</span>
                </Link>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Wishlist</span>
                </Link>
                <Link
                  to="/orders"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-medium">Orders</span>
                </Link>
                <Link
                  to="/certificates"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <FileCheck className="h-5 w-5" />
                  <span className="font-medium">Certificates</span>
                </Link>
                <Link
                  to="/support"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <HeadphonesIcon className="h-5 w-5" />
                  <span className="font-medium">Support</span>
                </Link>
                <Link
                  to="/account"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Account</span>
                </Link>
                <div className="border-t mt-4 pt-4">
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

        <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl">
          <img src="/LearnHub-Logo.svg" alt="LearnHub" className="h-8 w-8 sm:h-9 sm:w-9" />
          <span className="bg-gradient-primary bg-clip-text text-transparent">LearnHub</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/courses" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Courses
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/account" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Account
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Mobile: Direct link to account */}
          <Link to="/account" className="md:hidden">
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Desktop: Dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:flex">
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/account")} className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                <User className="h-4 w-4 mr-2" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard")} className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/wishlist")} className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/orders")} className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/certificates")} className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                <FileCheck className="h-4 w-4 mr-2" />
                Certificates
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/support")} className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                <HeadphonesIcon className="h-4 w-4 mr-2" />
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 flex items-center justify-between cursor-default">
                <span className="text-sm">Theme</span>
                <ThemeToggle />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
