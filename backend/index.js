const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const userController = require("./controllers/projectController");
const passport = require("passport");

const app = express();

// 1- middlewares
app.use(cors());
app.use(express.json());

// 2- routes
app.use('/api/auth', require('./routes/authRoute'));

// passport
app.use(passport.initialize());
require("./security/passport")(passport);

// 3- MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/authentication", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

// 4- Global error handler
// app.use((err,res,req,next)=>{
//     err.statuCode= err.statuCode || 500;
//     err.status = err.status || 'error' ;

//     res.status(err.statuCode).json({
//         status: err.status,
//         message: err.message,
//     });
// });

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// 5- server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`App running on server ${PORT}`);
});
