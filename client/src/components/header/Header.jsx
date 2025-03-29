import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Menu, MapPin, User, ShoppingBag, LogOut, Settings } from 'lucide-react';
import { logout, selectCurrentUser, selectIsAuthenticated } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profilePicture} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          {user?.role === 'business-owner' && (
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side with logo and navigation */}
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
                {isAuthenticated && user?.role === 'business-owner' && (
                  <Link to="/dashboard" className="text-lg font-medium">Dashboard</Link>
                )}
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="text-lg font-medium">Profile</Link>
                    <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
                  </>
                ) : (
                  <Link to="/login" className="text-lg font-medium">Login</Link>
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
            {isAuthenticated && user?.role === 'business-owner' && (
              <Link to="/dashboard" className="font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
            )}
          </nav>
        </div>
        
        {/* Right side with search and user actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-64">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search nearby..."
              className="w-full rounded-full pl-8 md:w-64 lg:w-80"
            />
          </div>
          
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button size="sm" onClick={() => navigate('/login')}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}