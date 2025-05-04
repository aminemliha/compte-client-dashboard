
import { Link } from "react-router-dom";
import { Search, Home, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  return (
    <header className="w-full bg-[#ed5f49] text-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/logo-attijariwafa.png" 
              alt="Attijariwafa Bank Logo" 
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#ed5f49]/80" asChild>
            <Link to="/" className="flex items-center gap-1">
              <Home size={18} />
              <span className="hidden sm:inline">Accueil</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#ed5f49]/80" asChild>
            <Link to="/vente" className="flex items-center gap-1">
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Vente</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#ed5f49]/80" asChild>
            <Link to="/selfcare" className="flex items-center gap-1">
              <User size={18} />
              <span className="hidden sm:inline">Selfcare</span>
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Empty div for balanced layout */}
          <div className="w-[100px]"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
