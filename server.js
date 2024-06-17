const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const db = require("./mysql/mysql");
const validateSession = require("./middleware/verify");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const executeQuery = require("./mysql/queryHandler");
const {insertTablesIfNotExists} = require("./mysql/defaultQuery");
const multer = require("multer");
const expressFileUpload = require("express-fileupload");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressFileUpload())

db();
// insertTablesIfNotExists();

app.use("/api/auth", require("./routes/signin"));
app.use("/api/dashboard", validateSession, require("./routes/dashboard"));
app.use("/api/edit", validateSession, require("./routes/edit"));
app.use("/api/provider", validateSession, require("./routes/provider"));

app.get("/", (req, res) => {
    res.send("API is working");
});

app.listen(PORT, () => {
    console.log("Server started successfully at port:" + 8000);
});
