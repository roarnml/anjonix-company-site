/*import { Routes, Route } from 'react-router-dom'
import TechHome from './pages/TechHome'
import Footer from "./components/navbar/Footer";
import Navbar from './components/navbar/Navbar';
import { CartProvider } from './components/Cart/CartContext';
import CartPage from './components/Cart/CartPage';
import ProductsPage from './pages/products/index';
import SolutionsPage from './pages/solutions/index';
import PartnersPage from './pages/partners/index';
import CheckoutPage from './components/Cart/Checkout';
import OrderConfirmation from './components/Cart/OrderConfirmationPage';
import TrainingMaterials from './pages/digitalTools/TrainingMaterials';




export default function TechApp() {
  return (
    <CartProvider>
      <Navbar variant='tech'/>
      <Routes>
        <Route path="/" element={<TechHome />} />
        {/* Category & subcategory *}
        <Route path="/tech/:categorySlug/:subcategorySlug" element={<ProductsPage />} />
        <Route path="/products/*" element={<ProductsPage />} />
        <Route path="/patrners/*" element={<PartnersPage />} />
        <Route path="/product/*" element={<SolutionsPage />} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />
        {/* Sales Category *}
        <Route path='/robotics-training' element={<TrainingMaterials />} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}
*/
import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CartProvider } from "./components/Cart/CartContext";

// Core Pages
import TechHome from "./pages/TechHome";
import Footer from "./components/navbar/Footer";
import Navbar from "./components/navbar/Navbar";
import CartPage from "./components/Cart/CartPage";
import ProductsPage from "./pages/products/index";
import SolutionsPage from "./pages/solutions/index";
import PartnersPage from "./pages/partners/index";
import CheckoutPage from "./components/Cart/Checkout";
import OrderConfirmation from "./components/Cart/OrderConfirmationPage";
import TrainingMaterials from "./pages/digitalTools/TrainingMaterials";
import ProtectedRoute from "./components/wrappers/ProtectedRouteWrappers";

// Dashboards
import LearnerDashboard from "./pages/learner/Dashboard";
import InstructorDashboard from "./pages/instructor/Dashboard";
import ManagementDashboard from "./pages/org/Dashboard";

// Lazy imports for portals
const AppRoutes = lazy(() => import("./routes/AppRoutes")); // handles admin + user portals
const VerifyEmail = lazy(() => import("./auths/VerifyEmail"));  


function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // hide Navbar/Footer on all portal routes
  const isPortalRoute =
    location.pathname.includes("/tech/user") ||
    location.pathname.includes("/tech/admin");

  return (
    <>
      {!isPortalRoute && <Navbar variant="tech" />}
      {children}
      {!isPortalRoute && <Footer />}
    </>
  );
}

export default function TechApp() {
  return (
    <CartProvider>
      <LayoutWrapper>
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <Routes>
            {/* 🏠 Public Site Routes */}
            <Route path="/" element={<TechHome />} />
            <Route path="/verify" element={<VerifyEmail />} /> {/* ✅ Add here */}
            <Route
              path="/tech/:categorySlug/:subcategorySlug"
              element={<ProductsPage />}
            />
            <Route path="/products/*" element={<ProductsPage />} />
            <Route path="/partners/*" element={<PartnersPage />} />
            <Route path="/product/*" element={<SolutionsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/robotics-training" element={<TrainingMaterials />} />

            {/* 🧭 App Routes (User + Admin Portals) */}
            <Route path="/tech/*" element={<AppRoutes />} />
            {/* Protected dashboards */}
            <Route element={<ProtectedRoute />}>
              <Route path="/tech/dashboard/student/*" element={<LearnerDashboard />} />
              <Route path="/tech/dashboard/instructor/*" element={<InstructorDashboard />} />
              <Route path="/tech/dashboard/management/*" element={<ManagementDashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </LayoutWrapper>
    </CartProvider>
  );
}
