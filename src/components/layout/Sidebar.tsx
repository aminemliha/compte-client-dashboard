
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const [formData, setFormData] = useState({
    agenceCode: "",
    bilan: "",
    nationality: "",
    minAge: "",
    clientType: "",
    market: "",
    segment: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search filters:", formData);
    // This will be connected to the search service
  };

  if (!open) return null;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 transition-all duration-200 overflow-auto h-[calc(100vh-64px)] fixed md:relative">
      <h2 className="font-semibold text-lg mb-6">Filtres</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="agenceCode">Code Agence</Label>
          <Input
            id="agenceCode"
            placeholder="Ex: 123456"
            value={formData.agenceCode}
            onChange={(e) => handleChange("agenceCode", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bilan">Bilan</Label>
          <Input
            id="bilan"
            placeholder="Entrer le bilan"
            value={formData.bilan}
            onChange={(e) => handleChange("bilan", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">Nationalité</Label>
          <Select
            value={formData.nationality}
            onValueChange={(value) => handleChange("nationality", value)}
          >
            <SelectTrigger id="nationality">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maroc">Maroc</SelectItem>
              <SelectItem value="france">France</SelectItem>
              <SelectItem value="espagne">Espagne</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minAge">Âge Minimum</Label>
          <Input
            id="minAge"
            type="number"
            placeholder="Ex: 18"
            value={formData.minAge}
            onChange={(e) => handleChange("minAge", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientType">Type de Client</Label>
          <Select
            value={formData.clientType}
            onValueChange={(value) => handleChange("clientType", value)}
          >
            <SelectTrigger id="clientType">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="particulier">Particulier</SelectItem>
              <SelectItem value="professionnel">Professionnel</SelectItem>
              <SelectItem value="entreprise">Entreprise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="market">Marché</Label>
          <Input
            id="market"
            placeholder="Entrer le marché"
            value={formData.market}
            onChange={(e) => handleChange("market", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="segment">Segment</Label>
          <Select
            value={formData.segment}
            onValueChange={(value) => handleChange("segment", value)}
          >
            <SelectTrigger id="segment">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-brand-orange hover:bg-brand-yellow text-white font-medium"
        >
          <Search className="mr-2 h-4 w-4" /> Rechercher
        </Button>
      </form>
    </aside>
  );
};

export default Sidebar;
