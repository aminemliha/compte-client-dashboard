
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VenteSearchParams {
  numeroCompteSupport: string;
  codeAgence: string;
  clientIdHost: string;
  statut: string;
  productCode: string;
  phase: string;
}

interface VenteClient {
  id: string;
  numeroCompte: string;
  clientId: string;
  nom: string;
  prenom: string;
  statutCompte: string;
  numeroTelephone: string;
  typeAbonnement: string;
}

const VentePage = () => {
  const [searchParams, setSearchParams] = useState<VenteSearchParams>({
    numeroCompteSupport: "",
    codeAgence: "",
    clientIdHost: "",
    statut: "",
    productCode: "",
    phase: "",
  });

  const [searchResults, setSearchResults] = useState<VenteClient[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (field: keyof VenteSearchParams, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search params:", searchParams);
    
    // Mock data for demonstration - in a real app, this would come from an API call
    const mockResults: VenteClient[] = [
      {
        id: "1",
        numeroCompte: "CMP-001-2023",
        clientId: "CLI-123456",
        nom: "Dupont",
        prenom: "Jean",
        statutCompte: "Actif",
        numeroTelephone: "+212 612345678",
        typeAbonnement: "Premium"
      },
      {
        id: "2",
        numeroCompte: "CMP-002-2023",
        clientId: "CLI-789012",
        nom: "Martin",
        prenom: "Sophie",
        statutCompte: "Relisé",
        numeroTelephone: "+212 623456789",
        typeAbonnement: "Standard"
      },
      {
        id: "3",
        numeroCompte: "CMP-003-2023",
        clientId: "CLI-345678",
        nom: "Benani",
        prenom: "Omar",
        statutCompte: "Actif",
        numeroTelephone: "+212 634567890",
        typeAbonnement: "Premium"
      }
    ];
    
    setSearchResults(mockResults);
    setHasSearched(true);
  };

  return (
    <div className="flex gap-4">
      {/* Custom Sidebar for Vente */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 h-[calc(100vh-64px)] overflow-auto">
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-4">Recherche de Vente</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numeroCompteSupport">Numéro de Compte Support</Label>
              <Input
                id="numeroCompteSupport"
                placeholder="Entrer le numéro"
                value={searchParams.numeroCompteSupport}
                onChange={(e) => handleChange("numeroCompteSupport", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codeAgence">Code Agence</Label>
              <Input
                id="codeAgence"
                placeholder="Entrer le code"
                value={searchParams.codeAgence}
                onChange={(e) => handleChange("codeAgence", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientIdHost">Client-id-Host</Label>
              <Input
                id="clientIdHost"
                placeholder="Entrer l'ID client"
                value={searchParams.clientIdHost}
                onChange={(e) => handleChange("clientIdHost", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select
                value={searchParams.statut}
                onValueChange={(value) => handleChange("statut", value)}
              >
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

            <div className="space-y-2">
              <Label htmlFor="productCode">Product Code</Label>
              <Select
                value={searchParams.productCode}
                onValueChange={(value) => handleChange("productCode", value)}
              >
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

            <div className="space-y-2">
              <Label htmlFor="phase">Phase</Label>
              <Select
                value={searchParams.phase}
                onValueChange={(value) => handleChange("phase", value)}
              >
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

            <Button 
              type="submit" 
              className="w-full bg-[#ed5f49] hover:bg-[#ed5f49]/90"
            >
              <Search className="mr-2 h-4 w-4" /> Rechercher
            </Button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {!hasSearched ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Module Vente</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Opérations de vente</CardTitle>
                  <CardDescription>Gérez vos opérations commerciales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Cette section permet de gérer les opérations de vente pour les comptes clients.</p>
                  <p>Utilisez le formulaire dans la barre latérale pour effectuer une recherche.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                  <CardDescription>Aperçu des performances</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Les statistiques de vente seront disponibles prochainement.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Résultats de recherche</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Comptes clients ({searchResults.length} résultats)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Numéro Compte</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Statut Compte</TableHead>
                        <TableHead>Numéro Téléphone</TableHead>
                        <TableHead>Type Abonnement</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            Aucun résultat trouvé
                          </TableCell>
                        </TableRow>
                      ) : (
                        searchResults.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell>{client.numeroCompte}</TableCell>
                            <TableCell>{client.clientId}</TableCell>
                            <TableCell>{client.nom}</TableCell>
                            <TableCell>{client.prenom}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                client.statutCompte === 'Actif' 
                                  ? 'bg-green-100 text-green-800' 
                                  : client.statutCompte === 'Relisé'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {client.statutCompte}
                              </span>
                            </TableCell>
                            <TableCell>{client.numeroTelephone}</TableCell>
                            <TableCell>{client.typeAbonnement}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VentePage;
