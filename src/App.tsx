
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/HomePage";
import DataPage from "./pages/DataPage";
import AccountDetailPage from "./pages/AccountDetailPage";
import VentePage from "./pages/VentePage";
import VenteDetailsPage from "./pages/VenteDetailsPage";
import NotFound from "./pages/NotFound";
import SelfcarePage from "./pages/SelfcarePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="data" element={<DataPage />} />
            <Route path="data/:id" element={<AccountDetailPage />} />
            <Route path="vente" element={<VentePage />} />
            <Route path="vente/details" element={<VenteDetailsPage />} />
            <Route path="selfcare" element={<SelfcarePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
