import Express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = Express();
const port = 9000;

// My sql configuration
const mySqlDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "linglingnako123",        // your password at your mysql, very important
  database: "test"
});

// middlewares
app.use(Express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.json("this is from the backend");
// });

// get
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books"
  mySqlDb.query(q, (err, data) => {
    if(err) return res.json(err)    //check error
    return res.json(data)     // return data if success
  })
});

// post req
app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";    //take note that the question mark is very important

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  // add data from mysql
  mySqlDb.query(q, [values], (err, data) => {
    if(err) return res.json(err)    //check error
    return res.json("Book has been created successfully")     // return data if success
  })
})

// delete method
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";   //remember we are not passing our values directly instead we identify it using "?"

  mySqlDb.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book has been deleted successfully..!");
  });
});

// update || put method
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";      //update code for mySql

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  mySqlDb.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// server
app.listen(port, () => {
  console.log(`Connected to Backend.. Over ${port}...!`);
});



// ==> read me rowell, I having difficulties about this mysql connection, render error => ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

//===> okay I just fix it, you need to use mysql2
//===> then code this @mysql: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'linglingnako123';

//===> also mysql2 , is much more compatible than using nodejs..