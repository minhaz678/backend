const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const contactRoute = require("./routes/contactR");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
// const contactMeRoute = require("./route/contact");
const multer = require("multer");
const path = require("path");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
// app.use("/api/", contactMeRoute);

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded as " + req.file.filename);
});

app.use("/api/auth", authRoute); //✔✔
app.use("/api/users", userRoute); //✔✔
app.use("/api/posts", postRoute); //✔✔
app.use("/api/categories", categoryRoute); //✔✔
app.use("/api/contactR", contactRoute); //✔✔

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Backend is running at port:5000");
});
