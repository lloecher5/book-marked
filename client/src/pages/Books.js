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
        console.log(res.data);

        setBooks(res.data);
      });
  }, [token]);

  if (!token) {
    navigate("/login");
  }

  //function that os used to delete existing books from the my books list
  const deleteBook = (e) => {
    //use the books api to delete a book that matches the id included in the delete button. Attach the token in the request to ensure the user is auhtenticated
    axios
      .delete(`/api/v1/books/${e.target.id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        //reload page after the book is deleted in the database
        window.location.reload();
      });
  };

  return (
    <div>
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.date.split("T")[0]}</p>
          <p>{book.rating}</p>
          <p>{book.notes}</p>
          <button id={book.id} onClick={deleteBook}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Books;
