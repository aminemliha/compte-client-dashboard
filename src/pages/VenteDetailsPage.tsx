
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const VenteDetailsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/vente">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Détails des ventes</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Détails des opérations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette page affichera les détails des opérations de vente. Cette fonctionnalité est en cours de développement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenteDetailsPage;
