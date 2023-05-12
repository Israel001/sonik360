import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import AllProductPage from './components/AllProductPage';
import Login from './components/Auth/Login/index';
import Profile from './components/Auth/Profile';
import Signup from './components/Auth/Signup';
import BecomeSaller from './components/BecomeSaller';
import Blogs from './components/Blogs';
import Blog from './components/Blogs/Blog/index';
import CartPage from './components/CartPage';
import CheakoutPage from './components/CheakoutPage';
import Contact from './components/Contact';
import Faq from './components/Faq';
import FlashSale from './components/FlashSale';
import FourZeroFour from './components/FourZeroFour';
import Home from './components/Home';
import HomeThree from './components/HomeThree';
import HomeTwo from './components/HomeTwo';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProductsCompaire from './components/ProductsCompaire/index';
import SallerPage from './components/SallerPage';
import Sallers from './components/Sellers';
import SingleProductPage from './components/SingleProductPage';
import TermsCondition from './components/TermsCondition/index';
import TrackingOrder from './components/TrackingOrder';
import Wishlist from './components/Wishlist';

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<AllProductPage />} />
      <Route path="/products/:id" element={<SingleProductPage />} />
      <Route path="/home-two" element={<HomeTwo />} />
      <Route path="/home-three" element={<HomeThree />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheakoutPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/flash-sale" element={<FlashSale />} />
      <Route path="/saller-page" element={<SallerPage />} />
      <Route path="/products-compaire" element={<ProductsCompaire />} />
      <Route path="/sallers" element={<Sallers />} />
      <Route path="/about" element={<About />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/blog" element={<Blog />} />
      <Route path="/tracking-order" element={<TrackingOrder />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/become-saller" element={<BecomeSaller />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-condition" element={<TermsCondition />} />
      <Route path="*" element={<FourZeroFour />} />
    </Routes>
  );
}
