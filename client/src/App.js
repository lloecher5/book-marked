import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import NavBarBootstrap from "./components/NavBarBootstrap";
import Footer from "./components/Footer";
import Stats from "./pages/Stats";

function App() {
  return (
    <div className="App">
      <NavBarBootstrap />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
