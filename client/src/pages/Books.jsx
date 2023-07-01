import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

const Books = () => {

  const freeIMg = [
    'https://static1.srcdn.com/wordpress/wp-content/uploads/2021/05/My-Hero-Academia-Himiko-Toga-1.jpg'
  ];

  const [books, setBooks] = useState([]);

  //fetch || get
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:9000/books"); //you can also use cors() || proxy if you want too
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  // console.log(books);

  // handle delete || delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/books/${id}`);
      window.location.reload()      // refreshes the ui =_=   // reason because mySql requires a loading sequence or a reload to get the data
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Dling's Book Shop</h1>
      {/* First segment */}
      <div className="books">
        {books.map((book) => (
          <div                  // send to this another component if compusing
            key={book.id} 
            className="book"
          >
            <img 
              src={freeIMg[0]}    // take note this requires a internet connection
              alt={`${book.id}-${book.title}`} 
            />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>${book.price}</span>

            {/* delete button */}
            <button 
              className="delete" 
              onClick={() => handleDelete(book.id)}     // take note that we are inside of the map, so book.id represent the created id of sql
            > Delete </button>

            {/* update button */}
            <button className="update">
              <Link
                to={`/update/${book.id}`}   //just link to an update page
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
        {/* button */}
      <button className="addHome">
        <Link 
          to="/add" 
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Add new book
        </Link>
      </button>
    </div>
  )
}

export default Books