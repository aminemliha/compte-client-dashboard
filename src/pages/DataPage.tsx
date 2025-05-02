
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearchData } from '@/hooks/useSearchData';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DataPage = () => {
  const location = useLocation();
  const initialFilters = location.state?.filters || {};
  
  const { 
    accounts, 
    loading, 
    error, 
    totalCount, 
    page, 
    pageSize, 
    setPage,
    setFilters
  } = useSearchData({ initialFilters });

  // Apply filters from navigation state when component mounts
  useEffect(() => {
    if (location.state?.filters) {
      setFilters(location.state.filters);
    }
  }, [location.state?.filters, setFilters]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Résultats de recherche</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Comptes clients ({totalCount} résultats)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 p-4">{error}</div>
          ) : accounts.length === 0 ? (
            <div className="text-center p-4">Aucun résultat trouvé</div>
          ) : (
            <>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numéro Original</TableHead>
                      <TableHead>Numéro Client Host</TableHead>
                      <TableHead>Numéro avec Lettres</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>{account.numeroOriginal}</TableCell>
                        <TableCell>{account.numeroClientHost}</TableCell>
                        <TableCell>{account.numeroAvecLettres}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            asChild
                          >
                            <Link to={`/data/${account.id}`}>
                              <Eye className="h-4 w-4 mr-1" /> Détails
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {page} sur {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={page <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={page >= totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPage;
