import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  let isbn = "";

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //function that will add a new book to the new books page
  const handleSubmit = (e) => {
    e.preventDefault();
    //get isbn here
    const params = `${title ? "title=" + title : ""}${
      author ? "&author=" + author : ""
    }`;
    //fetch to open library API
    fetch(`https://openlibrary.org/search.json?${params}&limit=1`)
      .then((res) => res.json())
      .then((data) => {
        isbn = data.docs[0].isbn[0];

        //use the books api to send a post request with the information from the from. Attach the token to authenticate user.
        axios
          .post(
            "/api/v1/books",
            {
              title,
              author,
              date,
              rating,
              notes,
              isbn,
            },
            {
              headers: {
                "x-access-token": token,
              },
            }
          )
          .then((res) => {
            alert(`${res.data.title} was successfully added.`);
            navigate("/books");
          });
      });
  };

  return (
    <div>
      <h1>Add new book</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </p>
        <p>
          <label htmlFor="author">Author</label>
          <br />
          <input
            type="text"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date Finished</label>
          <br />
          <input
            type="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            required
          />
        </p>
        <p>
          <label htmlFor="rating">Rating</label>
          <br />
          <input
            type="number"
            id="rating"
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            step="0.1"
            required
          />
        </p>
        <p>
          <label htmlFor="notes">Notes</label>
          <br />
          <textarea
            type="notes"
            id="rating"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            required></textarea>
        </p>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
