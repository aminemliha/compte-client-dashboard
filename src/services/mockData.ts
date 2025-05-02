
export interface AccountData {
  id: number;
  numeroOriginal: string;
  numeroClientHost: string;
  numeroAvecLettres: string;
  agenceCode: string;
  bilan: string;
  nationality: string;
  age: number;
  clientType: string;
  market: string;
  segment: string;
  dateCreation: string;
  status: string;
  solde: number;
  devise: string;
  adresse?: string;
  telephone?: string;
  email?: string;
}

// Generate mock data
const generateMockData = (count: number): AccountData[] => {
  const data: AccountData[] = [];
  
  for (let i = 1; i <= count; i++) {
    const id = i;
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const randomLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                          String.fromCharCode(65 + Math.floor(Math.random() * 26));
    
    const clientTypes = ['particulier', 'professionnel', 'entreprise'];
    const segments = ['premium', 'standard', 'basic'];
    const nationalities = ['maroc', 'france', 'espagne', 'autre'];
    const statuses = ['actif', 'inactif', 'bloqué', 'en attente'];
    const devises = ['MAD', 'EUR', 'USD'];
    
    data.push({
      id,
      numeroOriginal: `OR${randomNum}`,
      numeroClientHost: `CH${randomNum}`,
      numeroAvecLettres: `${randomLetters}${randomNum}`,
      agenceCode: (Math.floor(Math.random() * 900) + 100).toString(),
      bilan: (Math.random() * 1000000).toFixed(2),
      nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
      age: Math.floor(Math.random() * 50) + 18,
      clientType: clientTypes[Math.floor(Math.random() * clientTypes.length)],
      market: Math.random() > 0.5 ? 'Local' : 'International',
      segment: segments[Math.floor(Math.random() * segments.length)],
      dateCreation: new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      solde: parseFloat((Math.random() * 1000000).toFixed(2)),
      devise: devises[Math.floor(Math.random() * devises.length)],
      adresse: `${Math.floor(Math.random() * 999) + 1} Rue ${Math.floor(Math.random() * 100) + 1}, Casablanca`,
      telephone: `+212 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)}`,
      email: `client${id}@example.com`
    });
  }
  
  return data;
};

const mockAccounts = generateMockData(100);

export const fetchAccounts = (
  page: number = 1, 
  pageSize: number = 10,
  filters: Partial<AccountData> = {}
): Promise<{ data: AccountData[], totalCount: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData = [...mockAccounts];
      
      // Apply filters
      if (filters.agenceCode) {
        filteredData = filteredData.filter(acc => acc.agenceCode.includes(filters.agenceCode || ''));
      }
      
      if (filters.nationality) {
        filteredData = filteredData.filter(acc => acc.nationality === filters.nationality);
      }
      
      if (filters.clientType) {
        filteredData = filteredData.filter(acc => acc.clientType === filters.clientType);
      }
      
      if (filters.segment) {
        filteredData = filteredData.filter(acc => acc.segment === filters.segment);
      }
      
      // Apply pagination
      const startIndex = (page - 1) * pageSize;
      const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
      
      resolve({
        data: paginatedData,
        totalCount: filteredData.length
      });
    }, 300); // Simulate network delay
  });
};

export const fetchAccountById = (id: number): Promise<AccountData | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const account = mockAccounts.find(acc => acc.id === id);
      resolve(account || null);
    }, 300);
  });
};
