import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearchData } from '@/hooks/useSearchData';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Eye, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
const DataPage = () => {
  const location = useLocation();
  const initialFilters = location.state?.filters || {};
  const [searchQuery, setSearchQuery] = useState('');
  const {
    accounts,
    loading,
    error,
    totalCount,
    page,
    pageSize,
    setPage,
    setFilters
  } = useSearchData({
    initialFilters
  });

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
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({
      ...initialFilters,
      numeroClientHost: searchQuery
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, current page, last page and pages around current page
      if (page <= 3) {
        // If current page is near the start
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (page >= totalPages - 2) {
        // If current page is near the end
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // If current page is in the middle
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(page - 1);
        pageNumbers.push(page);
        pageNumbers.push(page + 1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };
  return <div className="space-y-4 mx-[15px]">
      <div className="flex items-center justify-between my-[9px]">
        <h1 className="text-2xl font-bold">Résultats de recherche</h1>
        
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Recherche rapide par numéro client..." className="w-full pl-9 h-10 bg-gray-50" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <Button type="submit" size="sm">Rechercher</Button>
        </form>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Comptes clients ({totalCount} résultats)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
            </div> : error ? <div className="text-red-500 p-4">{error}</div> : accounts.length === 0 ? <div className="text-center p-4">Aucun résultat trouvé</div> : <>
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
                    {accounts.map(account => <TableRow key={account.id}>
                        <TableCell>{account.numeroOriginal}</TableCell>
                        <TableCell>{account.numeroClientHost}</TableCell>
                        <TableCell>{account.numeroAvecLettres}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/data/${account.id}`}>
                              <Eye className="h-4 w-4 mr-1" /> Détails
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination section */}
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={e => {
                    e.preventDefault();
                    handlePreviousPage();
                  }} className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} aria-disabled={page <= 1} />
                    </PaginationItem>
                    
                    {getPageNumbers().map((pageNumber, index) => <PaginationItem key={index}>
                        {pageNumber === 'ellipsis' ? <span className="flex h-9 w-9 items-center justify-center">...</span> : <PaginationLink href="#" isActive={pageNumber === page} onClick={e => {
                    e.preventDefault();
                    typeof pageNumber === 'number' && setPage(pageNumber);
                  }} className="cursor-pointer">
                            {pageNumber}
                          </PaginationLink>}
                      </PaginationItem>)}
                    
                    <PaginationItem>
                      <PaginationNext href="#" onClick={e => {
                    e.preventDefault();
                    handleNextPage();
                  }} className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} aria-disabled={page >= totalPages} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>}
        </CardContent>
      </Card>
    </div>;
};
export default DataPage;