import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Signup from "./pages/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./pages/MyOrder";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOrder/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
