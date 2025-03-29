import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Store, 
  Tag, 
  User, 
  Menu, 
  X, 
  LogIn, 
  LogOut,
  MapPin 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state
  const navigate = useNavigate();

  // Mock logout function - replace with actual implementation
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MohallaMart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Discover
            </Link>
            <Link to="/deals" className="text-sm font-medium hover:text-primary">
              Deals
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-primary">
              Categories
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="default" size="sm" onClick={() => navigate('/login')}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                <Link to="/" className="flex items-center gap-2 text-lg font-medium">
                  <Home className="h-5 w-5" /> Discover
                </Link>
                <Link to="/deals" className="flex items-center gap-2 text-lg font-medium">
                  <Tag className="h-5 w-5" /> Deals
                </Link>
                <Link to="/categories" className="flex items-center gap-2 text-lg font-medium">
                  <Store className="h-5 w-5" /> Categories
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" className="flex items-center gap-2 text-lg font-medium">
                      <User className="h-5 w-5" /> Dashboard
                    </Link>
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button variant="default" onClick={() => navigate('/login')}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">MohallaMart</h3>
              <p className="text-sm text-muted-foreground">
                Discover and support local businesses in your neighborhood.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm hover:underline">Home</Link></li>
                <li><Link to="/about" className="text-sm hover:underline">About</Link></li>
                <li><Link to="/contact" className="text-sm hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-sm hover:underline">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm hover:underline">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MohallaMart. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;