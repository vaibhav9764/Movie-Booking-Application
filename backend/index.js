const express = require("express");
var cors = require('cors')
const connectToMongo = require("./db");



const port=5000;

const app = express();
app.use(cors())
connectToMongo();

// to use req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world 4");
});


// routes
app.use("/api/auth/user",require("./routes/user_routes"));
app.use("/api/auth/admin",require("./routes/admin_routes"));
app.use("/api/movies",require("./routes/movie_routes"));
app.use("/api/movies/booking",require("./routes/booking_routes"));



app.listen(port, () => {
  console.log("server running Successfully");
});
