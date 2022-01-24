import "./Home.css";
import Login from "./Login";
import { FaBookmark } from "react-icons/fa";
import { Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [renderedBook, setRenderedBook] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const showBook = books.filter((book) => {
    // will render book even if the does not match
    return book.title.toLowerCase() === selectedBook.toLowerCase();
  });

  const submitHandler = (e) => {
    e.preventDefault();

    setRenderedBook(showBook);
    setSelectedBook("");
    setMessage(
      `${selectedBook} does not yet exist in your book collection. Go to the "Add Book" page to expand your library!`
    );

    setTimeout(() => {
      navigate("add-book");
    }, 1000);
  };

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

  return (
    <div className="books">
      <h1 className="title">
        BookMarked <FaBookmark className="icon" />
      </h1>

      <p>Build your own virtual library, one book at a time.</p>
      {isLoggedIn ? (
        <>
          <h4>Search your collection of books.</h4>
          <form onSubmit={submitHandler}>
            <p>
              <input
                type="text"
                placeholder="Enter title of book."
                onChange={(e) => setSelectedBook(e.target.value)}
                value={selectedBook}
              />
            </p>

            <Button variant="dark" type="submit">
              Find Book
            </Button>
          </form>
          <div className="book-list">
            {renderedBook.length === 1 ? (
              renderedBook.map((book) => (
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
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>{message}</p>
            )}
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
