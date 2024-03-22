const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./database/connection");


dotEnv.config();

//initialize express framework
const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();

//using json
app.use(express.json());

//cors
const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

const myMiddleware = (req, res, next) => {
  console.log("Server Request");
  next();
};

app.use("/auth/user", require("./routes/userRoutes"));
app.use("/auth/property", require("./routes/propertyRoutes"));
app.use("/auth/checkout", require("./routes/checkoutRoutes"));

//show a simple text for browser access
app.get("/auth", myMiddleware, (req, res, next) =>
  res.send("Nodejs Server is Running")
);

app.use((err, res, req, next) => {
  res.status(500).send({
    status: 500,
    message: err.message,
    data: {},
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
