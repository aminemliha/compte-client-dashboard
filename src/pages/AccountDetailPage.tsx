
import { useParams, Link } from 'react-router-dom';
import { useAccountDetails } from '@/hooks/useAccountDetails';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const AccountDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const accountId = id ? parseInt(id, 10) : null;
  const { account, loading, error } = useAccountDetails(accountId);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Button asChild>
          <Link to="/data">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux résultats
          </Link>
        </Button>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="p-4">
        <div className="text-red-500 mb-4">Compte non trouvé</div>
        <Button asChild>
          <Link to="/data">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux résultats
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/data">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Détails du compte</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Numéro Original:</span>
                <span className="font-medium">{account.numeroOriginal}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Numéro Client Host:</span>
                <span className="font-medium">{account.numeroClientHost}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Numéro avec Lettres:</span>
                <span className="font-medium">{account.numeroAvecLettres}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Date de création:</span>
                <span className="font-medium">{account.dateCreation}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Statut:</span>
                <span className="font-medium">{account.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Données financières</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Code Agence:</span>
                <span className="font-medium">{account.agenceCode}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Bilan:</span>
                <span className="font-medium">{account.bilan}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Solde:</span>
                <span className="font-medium">{account.solde.toLocaleString()} {account.devise}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profil client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Nationalité:</span>
                <span className="font-medium capitalize">{account.nationality}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Âge:</span>
                <span className="font-medium">{account.age} ans</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Type de client:</span>
                <span className="font-medium capitalize">{account.clientType}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Marché:</span>
                <span className="font-medium">{account.market}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Segment:</span>
                <span className="font-medium capitalize">{account.segment}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Adresse:</span>
                <span className="font-medium">{account.adresse || 'N/A'}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Téléphone:</span>
                <span className="font-medium">{account.telephone || 'N/A'}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{account.email || 'N/A'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountDetailPage;
