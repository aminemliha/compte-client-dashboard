
import { useParams, Link } from 'react-router-dom';
import { useAccountDetails } from '@/hooks/useAccountDetails';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

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

  // Generate unified data for the single DataGrid including all account information
  const accountDetailsData = [
    { label: "Numéro Original", value: account.numeroOriginal },
    { label: "Numéro Client Host", value: account.numeroClientHost },
    { label: "Numéro avec Lettres", value: account.numeroAvecLettres },
    { label: "Code Agence", value: account.agenceCode },
    { label: "Bilan", value: account.bilan },
    { label: "Nationalité", value: account.nationality },
    { label: "Âge", value: `${account.age} ans` },
    { label: "Type de Client", value: account.clientType },
    { label: "Marché", value: account.market },
    { label: "Segment", value: account.segment },
    { label: "Date de Création", value: account.dateCreation },
    { label: "Statut", value: account.status },
    { label: "Solde", value: `${account.solde.toLocaleString()} ${account.devise}` },
    { label: "Adresse", value: account.adresse || "N/A" },
    { label: "Téléphone", value: account.telephone || "N/A" },
    { label: "Email", value: account.email || "N/A" },
    { label: "Abonnement", value: account.subscription || "Standard" },
    { label: "Limite de Découvert", value: `${account.overdraftLimit || 0} ${account.devise}` },
    { label: "Dernière Activité", value: account.lastActivity || "N/A" }
  ];

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
      
      {/* Single DataGrid containing all account information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations complètes du compte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Information</TableHead>
                  <TableHead className="w-2/3">Valeur</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountDetailsData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.label}</TableCell>
                    <TableCell>{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Cards DataGrid */}
      <Card>
        <CardHeader>
          <CardTitle>Cartes bancaires associées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {account.cards && account.cards.length > 0 ? (
                  account.cards.map((card, index) => (
                    <TableRow key={index}>
                      <TableCell>{card.type}</TableCell>
                      <TableCell>{card.number}</TableCell>
                      <TableCell>{card.expiry}</TableCell>
                      <TableCell>{card.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">Aucune carte associée</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountDetailPage;
