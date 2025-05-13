
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VenteSearchSidebar } from "@/components/vente/VenteSearchSidebar";
import { useToast } from "@/components/ui/use-toast";

const VentePage = () => {
  const { toast } = useToast();
  
  return (
    <div className="space-y-6 mx-[14px] my-[14px] px-[6px]">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Module Vente</h1>
        <p className="text-muted-foreground">
          Gérez les opérations commerciales pour les comptes clients.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recherche</CardTitle>
            <CardDescription>
              Rechercher des comptes clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Utilisez le formulaire de recherche dans la barre latérale pour trouver des comptes clients selon différents critères.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Opérations</CardTitle>
            <CardDescription>
              Gérer les opérations de vente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Accédez aux opérations commerciales en cours et gérez les transactions pour les clients.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Statistiques</CardTitle>
            <CardDescription>
              Consulter les statistiques de vente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visualisez les statistiques et indicateurs de performance des opérations de vente en temps réel.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VentePage;
