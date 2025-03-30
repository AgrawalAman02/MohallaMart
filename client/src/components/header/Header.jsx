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
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side with logo and navigation */}
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-slate-950 border-slate-800">
              <SheetHeader>
                <SheetTitle className="text-slate-100">MohallaMart</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                <Link to="/" className="text-lg font-medium text-slate-300 hover:text-indigo-400">Home</Link>
                <Link to="/explore" className="text-lg font-medium text-slate-300 hover:text-indigo-400">Explore</Link>
                <Link to="/deals" className="text-lg font-medium text-slate-300 hover:text-indigo-400">Deals</Link>
                {isAuthenticated && user?.role === 'business-owner' && (
                  <Link to="/dashboard" className="text-lg font-medium text-slate-300 hover:text-indigo-400">Dashboard</Link>
                )}
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="text-lg font-medium text-slate-300 hover:text-indigo-400">Profile</Link>
                    <Button variant="outline" onClick={handleLogout} 
                      className="border-slate-700 text-slate-300 hover:bg-slate-800">Sign Out</Button>
                  </>
                ) : (
                  <Link to="/login" className="text-lg font-medium text-slate-300 hover:text-indigo-400">Login</Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-2 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500">
              MohallaMart
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="font-medium text-slate-300 transition-colors hover:text-indigo-400">Home</Link>
            <Link to="/explore" className="font-medium text-slate-300 transition-colors hover:text-indigo-400">Explore</Link>
            <Link to="/deals" className="font-medium text-slate-300 transition-colors hover:text-indigo-400">Deals</Link>
            {isAuthenticated && user?.role === 'business-owner' && (
              <Link to="/dashboard" className="font-medium text-slate-300 transition-colors hover:text-indigo-400">Dashboard</Link>
            )}
          </nav>
        </div>
        
        {/* Right side with search and user actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-64">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-400" />
            <Input
              type="search"
              placeholder="Search nearby..."
              className="w-full rounded-full pl-8 md:w-64 lg:w-80 bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500 focus:border-indigo-500"
            />
          </div>
          
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button 
              size="sm" 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-full"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}