
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const VenteWelcomeContent = () => {
  return (
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
  );
};
