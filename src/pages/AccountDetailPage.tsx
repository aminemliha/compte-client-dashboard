
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

  // Generate account details data for the DataGrid
  const accountDetailsData = [
    { label: "Numéro Original", value: account.numeroOriginal },
    { label: "Numéro Client Host", value: account.numeroClientHost },
    { label: "Numéro avec Lettres", value: account.numeroAvecLettres },
    { label: "Code Agence", value: account.agenceCode },
    { label: "Date de Création", value: account.dateCreation },
    { label: "Statut", value: account.status },
    { label: "Abonnement", value: account.subscription || "Standard" },
    { label: "Limite de Découvert", value: `${account.overdraftLimit || 0} ${account.devise}` },
    { label: "Dernière Activité", value: account.lastActivity || "N/A" },
  ];

  // Generate cards data if available
  const cardData = account.cards || [
    { type: "Visa Premium", number: "4901 **** **** 3456", expiry: "12/25", status: "Active" },
    { type: "Mastercard", number: "5123 **** **** 6789", expiry: "08/24", status: "Active" }
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

      {/* New DataGrid for detailed account information */}
      <Card>
        <CardHeader>
          <CardTitle>Détails complets du compte</CardTitle>
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
                {cardData.map((card, index) => (
                  <TableRow key={index}>
                    <TableCell>{card.type}</TableCell>
                    <TableCell>{card.number}</TableCell>
                    <TableCell>{card.expiry}</TableCell>
                    <TableCell>{card.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountDetailPage;
