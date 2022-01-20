import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/books">My Books</Link>
              </li>
              <li>
                <Link to="/add-book">Add New Book</Link>
              </li>
              <li>
                <button href="#" onClick={() => handleLogout()}>
                  {" "}
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
