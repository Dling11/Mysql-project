import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

const Add = () => {

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // handleChange every inputs
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(book);

  // handleClick || or sending the inputs
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/books", book);    //remeber axios => "book" contains the data || post
      navigate("/");    //navigate if done
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };


  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"              // this is a image
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}        {/* create a error handler soon */}
      
      <Link to="/">See all books</Link>
    </div>
  )
}

export default Add