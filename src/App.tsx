import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Enroll from "./pages/Enroll";
import EnrollmentSuccess from "./pages/EnrollmentSuccess";
import Dashboard from "./pages/Dashboard";
import Certificate from "./pages/Certificate";
import Certificates from "./pages/Certificates";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="learnhub-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/enroll/:id" element={<Enroll />} />
            <Route path="/enrollment-success/:id" element={<EnrollmentSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/certificate/:id" element={<Certificate />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderId" element={<OrderDetail />} />
            <Route path="/support" element={<Support />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
