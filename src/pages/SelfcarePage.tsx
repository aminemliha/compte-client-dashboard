
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SelfcarePage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Selfcare</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Gestion du compte</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Bienvenue dans l'espace Selfcare. Cette page est en cours de développement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelfcarePage;
