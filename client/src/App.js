import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </div>
  );
}

export default App;
