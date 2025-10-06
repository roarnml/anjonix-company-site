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

import { Routes, Route, useLocation } from 'react-router-dom'
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
import Login from './auths/Login';

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Define a check for "portal" routes
  const isPortalRoute = location.pathname.includes("user");

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
        <Routes>
          <Route path="/" element={<TechHome />} />
          {/* Category & subcategory */}
          <Route path="/tech/:categorySlug/:subcategorySlug" element={<ProductsPage />} />
          <Route path="/products/*" element={<ProductsPage />} />
          <Route path="/patrners/*" element={<PartnersPage />} />
          <Route path="/product/*" element={<SolutionsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          {/* Sales Category */}
          <Route path="/robotics-training" element={<TrainingMaterials />} />
          {/* Authentication Pages */}
          <Route path="/tech/user/*" element={<Login />} />

        </Routes>
      </LayoutWrapper>
    </CartProvider>
  );
}
