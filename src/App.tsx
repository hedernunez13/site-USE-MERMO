import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageFallback } from "@/components/layout/PageFallback";

// Code splitting por rota
const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const VirtualTryOn = lazy(() => import("@/pages/VirtualTryOn"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Account = lazy(() => import("@/pages/Account"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  return (
    <Routes>
      {/* Painel administrativo — layout próprio. Suspense isolado aqui pois
          não há Navbar nesta rota para se preocupar em preservar. */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<PageFallback />}>
            <Admin />
          </Suspense>
        }
      />

      {/* Storefront — o Suspense de cada página fica dentro do Layout,
          envolvendo só o <Outlet />, para que a Navbar (e o menu mobile)
          nunca sejam suspensos durante o carregamento de uma rota nova. */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/produto/:slug" element={<ProductDetail />} />
        <Route path="/virtual-try-on" element={<VirtualTryOn />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/conta" element={<Account />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
