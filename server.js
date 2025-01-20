const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");

const dotenv = require("dotenv");
const connectDB = require("./config/db");



dotenv.config();


// routes
const userRoutes = require("./routes/userRoutes")

const blogRoutes = require("./routes/blogRoutes")

connectDB();

const PORT = process.env.PORT || 8080

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);






//listen

app.listen(PORT,()=> {
    console.log("server is running on port 8080");
    
})