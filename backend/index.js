const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./database/connection");
const CLIENT_URL = process.env.DEV?"http://localhost:5174/":"http://localhost:5174"


dotEnv.config();

//initialize express framework
const app = express();
const PORT = process.env.PORT || 4000;

dbConnection();

//using json
app.use(express.json());

//cors
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};


app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

const myMiddleware = (req, res, next) => {
  console.log("Server Request");
  next();
};

app.use("/api/v1/auth/user", require("./routes/userRoutes"));
app.use("/api/v1/auth/property", require("./routes/propertyRoutes"));
app.use("/api/v1/auth/checkout", require("./routes/checkoutRoutes"));

//show a simple text for browser access
app.get("/auth", myMiddleware, (req, res, next) =>
  res.send("Nodejs Server is Running")
);
app.get("/", myMiddleware, (req, res, next) =>
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
