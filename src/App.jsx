import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FeePayment from "./pages/FeePayment";
import PaymentSuccess from "./pages/PaymentSuccess";
import AcademicCalendar from "./pages/AcademicCalendar";
import ApplyAdmission from "./pages/ApplyAdmission";
import StudentsData from "./pages/StudentsData";
import Transcripts from "./pages/Transcripts";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/fee-payment" element={<FeePayment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/academic-calendar" element={<AcademicCalendar />} />
            <Route path="/apply-admission" element={<ApplyAdmission />} />
            <Route path="/students-data" element={<StudentsData />} />
            <Route path="/transcripts" element={<Transcripts />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;