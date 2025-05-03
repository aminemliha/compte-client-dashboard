
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-brand-black">
              Attijariwafa Bank
            </span>
          </Link>
        </div>

        <div className="hidden md:block w-1/3 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Recherche rapide par numéro client..."
              className="w-full pl-9 h-10 bg-gray-50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/vente">Vente</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/data">Rechercher</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
