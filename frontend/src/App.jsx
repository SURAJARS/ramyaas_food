import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Navigation, Footer } from './components/Layout';
import ToastContainer from './components/Toast';
import Home from './pages/Home';
import Snacks from './pages/Snacks';
import Menu from './pages/Menu';
import Catering from './pages/Catering';
import BulkOrders from './pages/BulkOrders';
import Reels from './pages/Reels';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Admin from './pages/admin/Admin';
import { useCart } from './context/CartContext';

function App() {
  const { toasts, removeToast } = useCart();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snacks" element={<Snacks />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/bulk-orders" element={<BulkOrders />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  );
}

export default App;

