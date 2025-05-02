
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue sur l'application de recherche de comptes clients.
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
            <CardTitle>Ventes</CardTitle>
            <CardDescription>
              Accéder au module ventes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Accédez au module Ventes pour consulter les opérations commerciales en cours.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Résultats</CardTitle>
            <CardDescription>
              Consulter les résultats de recherche
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visualisez les résultats de recherche dans un tableau paginé avec des options de filtrage avancées.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
