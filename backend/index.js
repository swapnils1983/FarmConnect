const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connection/db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
connectDB(process.env.MONGO_URI);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use('/api/orders', require('./routes/order'));


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
