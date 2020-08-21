const express = require("express");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

// middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.array());
app.use(morgan("dev"));

// route
const card = require("./api/card");
app.use("/api", card);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../", "build")));

  app.use("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../", "build", "index.html"));
  });
}

app.use((err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`Server started : http://localhost:${port}`)
);
