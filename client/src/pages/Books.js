import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./Books.css";

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
      });
  }, [token]);

  if (books.length === 0) {
    navigate("/add-book");
  }

  if (!token) {
    navigate("/login");
  }

  //sort the books based on rating
  books.sort((a, b) => {
    return b.rating - a.rating;
  });

  //function that is used to delete existing books from the my books list
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
    <div className="books">
      <h1>Your book collection.</h1>

      <div className="book-list">
        {books.map((book) => (
          <Card key={book.id} style={{ width: "18rem" }}>
            <Card.Img
              className="cover"
              variant="top"
              src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
            />
            <Card.Body className="text">
              <Card.Title>Rating: {book.rating}</Card.Title>
              <Card.Text>
                <b>Date Finished:</b> {book.date.split("T")[0]}
                <br />
                <u>Notes:</u>
                <br />
                {book.notes}
              </Card.Text>
              <Button variant={"danger"} id={book.id} onClick={deleteBook}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Books;
