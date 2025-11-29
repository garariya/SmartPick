import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Homepage from "./pages/Homepage";
import CategoryPage from "./pages/CategoryPage"
import ProductPage from "./pages/ProductPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} /> 
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="/product/:id" element={<ProductPage/>}/>
        <Route path="/category/:category" element={<CategoryPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
