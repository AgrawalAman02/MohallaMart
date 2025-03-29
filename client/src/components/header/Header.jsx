import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, MapPin, User, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>MohallaMart</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                <Link to="/" className="text-lg font-medium">Home</Link>
                <Link to="/explore" className="text-lg font-medium">Explore</Link>
                <Link to="/deals" className="text-lg font-medium">Deals</Link>
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" className="text-lg font-medium">Profile</Link>
                    <Link to="/favorites" className="text-lg font-medium">Favorites</Link>
                    <Button variant="outline" onClick={() => setIsLoggedIn(false)}>Sign Out</Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-lg font-medium">Login</Link>
                    <Link to="/register" className="text-lg font-medium">Register</Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">MohallaMart</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/explore" className="font-medium transition-colors hover:text-primary">
              Explore
            </Link>
            <Link to="/deals" className="font-medium transition-colors hover:text-primary">
              Deals
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-64">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search nearby..."
              className="w-full rounded-full pl-8 md:w-64 lg:w-80"
            />
          </div>
          
          {isLoggedIn ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}