import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VenteSearchSidebar, VenteSearchParams } from "@/components/vente/VenteSearchSidebar";
import { VenteResultsTable, VenteClient } from "@/components/vente/VenteResultsTable";
import { VenteWelcomeContent } from "@/components/vente/VenteWelcomeContent";
const VentePage = () => {
  const [searchResults, setSearchResults] = useState<VenteClient[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleSearch = (params: VenteSearchParams) => {
    console.log("Search params:", params);

    // Mock data for demonstration - in a real app, this would come from an API call
    const mockResults: VenteClient[] = [{
      id: "1",
      numeroCompte: "CMP-001-2023",
      clientId: "CLI-123456",
      nom: "Dupont",
      prenom: "Jean",
      statutCompte: "Actif",
      numeroTelephone: "+212 612345678",
      typeAbonnement: "Premium"
    }, {
      id: "2",
      numeroCompte: "CMP-002-2023",
      clientId: "CLI-789012",
      nom: "Martin",
      prenom: "Sophie",
      statutCompte: "Relisé",
      numeroTelephone: "+212 623456789",
      typeAbonnement: "Standard"
    }, {
      id: "3",
      numeroCompte: "CMP-003-2023",
      clientId: "CLI-345678",
      nom: "Benani",
      prenom: "Omar",
      statutCompte: "Actif",
      numeroTelephone: "+212 634567890",
      typeAbonnement: "Premium"
    }];
    setSearchResults(mockResults);
    setHasSearched(true);
  };
  const handleToggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };
  return <div className="flex h-full mt-2 my-0">
      {/* Using the same sidebar structure as the home page */}
      <VenteSearchSidebar onSearch={handleSearch} open={sidebarOpen} onToggle={handleToggleSidebar} />

      {/* Main content with ScrollArea for consistent scrolling behavior */}
      <ScrollArea className="flex-1 h-[calc(100vh-80px)]">
        <div className="p-4 md:p-6" style={{
        marginLeft: sidebarOpen ? "" : "0"
      }}>
          {!hasSearched ? <VenteWelcomeContent /> : <div className="space-y-6">
              <h1 className="text-2xl font-bold">Résultats de recherche</h1>
              <VenteResultsTable clients={searchResults} />
            </div>}
        </div>
      </ScrollArea>
    </div>;
};
export default VentePage;