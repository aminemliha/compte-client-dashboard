
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface VenteClient {
  id: string;
  numeroCompte: string;
  clientId: string;
  nom: string;
  prenom: string;
  statutCompte: string;
  numeroTelephone: string;
  typeAbonnement: string;
}

interface VenteResultsTableProps {
  clients: VenteClient[];
}

export const VenteResultsTable = ({ clients }: VenteResultsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comptes clients ({clients.length} résultats)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro Compte</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Statut Compte</TableHead>
                <TableHead>Numéro Téléphone</TableHead>
                <TableHead>Type Abonnement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Aucun résultat trouvé
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.numeroCompte}</TableCell>
                    <TableCell>{client.clientId}</TableCell>
                    <TableCell>{client.nom}</TableCell>
                    <TableCell>{client.prenom}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.statutCompte === 'Actif' 
                          ? 'bg-green-100 text-green-800' 
                          : client.statutCompte === 'Relisé'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {client.statutCompte}
                      </span>
                    </TableCell>
                    <TableCell>{client.numeroTelephone}</TableCell>
                    <TableCell>{client.typeAbonnement}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
