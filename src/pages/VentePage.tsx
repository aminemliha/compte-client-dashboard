
import { useState } from "react";
import { VenteSearchSidebar, VenteSearchParams } from "@/components/vente/VenteSearchSidebar";
import { VenteResultsTable, VenteClient } from "@/components/vente/VenteResultsTable";
import { VenteWelcomeContent } from "@/components/vente/VenteWelcomeContent";

const VentePage = () => {
  const [searchResults, setSearchResults] = useState<VenteClient[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (params: VenteSearchParams) => {
    console.log("Search params:", params);
    
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
      <VenteSearchSidebar onSearch={handleSearch} />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {!hasSearched ? (
          <VenteWelcomeContent />
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Résultats de recherche</h1>
            <VenteResultsTable clients={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VentePage;
