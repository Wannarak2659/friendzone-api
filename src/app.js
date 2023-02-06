// ## sync data with mysql
// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

// ----------------------------------

require("dotenv").config();
const express = require("express");
const cors = require("cors"); // server that allow request cross domain: a request server domain b
const chalk = require("chalk"); // color words in terminal
const morgan = require("morgan"); //
const helmet = require("helmet"); // security for our website
const { rateLimit } = require("express-rate-limit");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15, // 15 minute per ip address prevent boots force
    max: 1,
    message: { message: "Too many requests, please try again later" },
  })
);
// app.use(helmet());
app.use(cors()); // allow all origins
app.use(express.json());

// app.use("/auth", authRoute); // need to be between app.use and notFoundmiddleware
// app.use("/users", authenticateMiddleware, userRoute);
// app.use("/friends", authenticateMiddleware, friendRoute);
// app.use("/posts", authenticateMiddleware, postRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.white.bgBlue.italic.bold(`Server running on port: ${port}`))
);
