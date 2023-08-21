const express = require("express"),
  cors = require("cors"),
  logger = require("morgan"),
  app = express();

require("dotenv").config();

const { conn } = require("./services/db_connection");

app.use(cors());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/standards-levy", (req, res, next) => {
  const {
    companyName,
    kraPin,
    email,
    phoneNo,
    address,
    periodFrom,
    periodTo,
    salesValue,
    vat,
    payableLevy,
  } = req.body;

  const insertQuery =
    "INSERT INTO standards_levy (company, pin_number, email, number, address, period_from, period_to, sales, vat, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    companyName,
    kraPin,
    email,
    phoneNo,
    address,
    periodFrom,
    periodTo,
    salesValue,
    vat,
    payableLevy,
  ];

  conn.query(insertQuery, values, (err, result) => {
    if (err)
      return res.status(500).json({ error: `Internal Server Error ${err}` });

    return res
      .status(201)
      .json({ msg: "successfully uploaded the data", status: 201 });
  });
});

//error middleware
app.use((error, req, res, next) => {
  const status = res.statusCode || 500;
  const message = res.message;
  const data = res.data;

  return res.status(status).json({ err: message, data: data });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Strange Vortex 3000 seen in space");
});
