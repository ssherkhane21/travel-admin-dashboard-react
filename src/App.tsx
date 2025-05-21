
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Bus Management
import BusOperators from "./pages/bus/BusOperators";
import BusOperatorDetails from "./pages/bus/BusOperatorDetails";
import BusOperatorBuses from "./pages/bus/BusOperatorBuses";
import BusBookings from "./pages/bus/BusBookings";

// Hotel Management
import HotelManagers from "./pages/hotel/HotelManagers";
import HotelManagerDetails from "./pages/hotel/HotelManagerDetails";
import HotelBookings from "./pages/hotel/HotelBookings";

// Taxi Management
import TaxiDrivers from "./pages/taxi/TaxiDrivers";
import TaxiDriverDetails from "./pages/taxi/TaxiDriverDetails";
import TaxiBookings from "./pages/taxi/TaxiBookings";

// Bike Management
import BikeRiders from "./pages/bike/BikeRiders";
import BikeRiderDetails from "./pages/bike/BikeRiderDetails";
import BikeBookings from "./pages/bike/BikeBookings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          
          {/* Bus Management Routes */}
          <Route path="/bus/operators" element={<Layout><BusOperators /></Layout>} />
          <Route path="/bus/operators/:id" element={<Layout><BusOperatorDetails /></Layout>} />
          <Route path="/bus/operators/:id/buses" element={<Layout><BusOperatorBuses /></Layout>} />
          <Route path="/bus/bookings" element={<Layout><BusBookings /></Layout>} />
          
          {/* Hotel Management Routes */}
          <Route path="/hotel/managers" element={<Layout><HotelManagers /></Layout>} />
          <Route path="/hotel/managers/:id" element={<Layout><HotelManagerDetails /></Layout>} />
          <Route path="/hotel/bookings" element={<Layout><HotelBookings /></Layout>} />
          
          {/* Taxi Management Routes */}
          <Route path="/taxi/drivers" element={<Layout><TaxiDrivers /></Layout>} />
          <Route path="/taxi/drivers/:id" element={<Layout><TaxiDriverDetails /></Layout>} />
          <Route path="/taxi/bookings" element={<Layout><TaxiBookings /></Layout>} />
          
          {/* Bike Management Routes */}
          <Route path="/bike/riders" element={<Layout><BikeRiders /></Layout>} />
          <Route path="/bike/riders/:id" element={<Layout><BikeRiderDetails /></Layout>} />
          <Route path="/bike/bookings" element={<Layout><BikeBookings /></Layout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
