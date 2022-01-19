import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/books", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      });
  }, [token]);

  if (!token) {
    navigate("/login");
  }

  return (
    <div>
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.date}</p>
          <p>{book.rating}</p>
          <p>{book.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default Books;
