import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X, PanelLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export interface VenteSearchParams {
  numeroCompteSupport: string;
  codeAgence: string;
  clientIdHost: string;
  statut: string;
  productCode: string;
  phase: string;
}
interface VenteSearchSidebarProps {
  onSearch: (params: VenteSearchParams) => void;
  open: boolean;
  onToggle: () => void;
}
export const VenteSearchSidebar = ({
  onSearch,
  open,
  onToggle
}: VenteSearchSidebarProps) => {
  const [searchParams, setSearchParams] = useState<VenteSearchParams>({
    numeroCompteSupport: "",
    codeAgence: "",
    clientIdHost: "",
    statut: "",
    productCode: "",
    phase: ""
  });
  const handleChange = (field: keyof VenteSearchParams, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };
  if (!open) {
    return <div className="h-[calc(100vh-64px)] fixed md:relative">
        <Button onClick={onToggle} variant="ghost" size="icon" className="m-2">
          <PanelLeft className="h-4 w-4" />
          <span className="sr-only">Ouvrir</span>
        </Button>
      </div>;
  }
  return <aside className="w-64 bg-white border-r border-gray-200 p-4 transition-all duration-200 h-[calc(100vh-64px)] fixed md:relative mx-0 py-0 my-0">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Recherche de Vente</h2>
        <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
          <X className="h-4 w-4" />
          <span className="sr-only">Fermer</span>
        </Button>
      </div>
      
      <form onSubmit={handleSearch} className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="numeroCompteSupport">Numéro de Compte Support</Label>
          <Input id="numeroCompteSupport" placeholder="Entrer le numéro" value={searchParams.numeroCompteSupport} onChange={e => handleChange("numeroCompteSupport", e.target.value)} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="codeAgence">Code Agence</Label>
          <Input id="codeAgence" placeholder="Entrer le code" value={searchParams.codeAgence} onChange={e => handleChange("codeAgence", e.target.value)} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="clientIdHost">Client-id-Host</Label>
          <Input id="clientIdHost" placeholder="Entrer l'ID client" value={searchParams.clientIdHost} onChange={e => handleChange("clientIdHost", e.target.value)} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="statut">Statut</Label>
          <Select value={searchParams.statut} onValueChange={value => handleChange("statut", value)}>
            <SelectTrigger id="statut">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="actif">Actif</SelectItem>
              <SelectItem value="relise">Relisé</SelectItem>
              <SelectItem value="fermer">Fermé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="productCode">Product Code</Label>
          <Select value={searchParams.productCode} onValueChange={value => handleChange("productCode", value)}>
            <SelectTrigger id="productCode">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="21343">21343</SelectItem>
              <SelectItem value="3222">3222</SelectItem>
              <SelectItem value="3456">3456</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="phase">Phase</Label>
          <Select value={searchParams.phase} onValueChange={value => handleChange("phase", value)}>
            <SelectTrigger id="phase">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="P08">P08</SelectItem>
              <SelectItem value="P78">P78</SelectItem>
              <SelectItem value="D43">D43</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-yellow text-white font-medium mt-4">
          <Search className="mr-2 h-4 w-4" /> Rechercher
        </Button>
      </form>
    </aside>;
};