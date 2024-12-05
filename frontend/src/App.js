import { BrowserRouter, Routes, Route} from "react-router";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import NewProduct from "./components/pages/NewProduct"
import Login from "./components/pages/Login";
import { AuthProvider } from "./components/contexts/Auth";
import NewUser from "./components/pages/NewUser";
import EditProduct from "./components/pages/EditProduct";
import PrivateRoutes from "./routes/PrivateRoutes";
import MyOrders from "./components/pages/MyOrders";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/me" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
      <Route path="/me/products" element={<PrivateRoutes><Products /></PrivateRoutes>} />
      <Route path="/products/new" element={<NewProduct />} />
      <Route path="/products/:id" element={<EditProduct />} />
      <Route path="/singup" element={<NewUser />} />
      <Route path="/me/orders" element={<PrivateRoutes><MyOrders /></PrivateRoutes>} />
      
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
