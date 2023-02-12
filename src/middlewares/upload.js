const chalk = require("chalk");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "" + Math.round(Math.random() * 100000));
  },
});

module.exports = multer({ storage: storage });
