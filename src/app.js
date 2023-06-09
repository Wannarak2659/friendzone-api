// ## sync  all data with mysql
// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

// ## sync specific table with mysql
// const { Post, PostComment } = require("./models");
// Post.sync({ force: true });

// const { Table_name } = require("./models");
// Table_name.sync({ force: true });

// const { GroupPage } = require("./models");
// GroupPage.sync({ force: true });
// ----------------------------------

require("dotenv").config();
const express = require("express");
const cors = require("cors"); // server that allow request cross domain: a request server domain b
const chalk = require("chalk");
// color words in terminal
const morgan = require("morgan"); //
const helmet = require("helmet");
// security for website
const { rateLimit } = require("express-rate-limit");

const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const groupRoute = require("./routes/group-route");
const postRoute = require("./routes/post-route");
const authenticateMiddleware = require("./middlewares/authenticate");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));
// most use in dev process for log request
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 30,
    // 15 minute per ip address prevent boots force
    max: 500,
    message: { message: "Too many requests, please try again later" },
  })
);
// app.use(helmet());
app.use(cors()); // allow all origins
app.use(express.json());

// # must be between app.use and notFoundmiddleware
app.use("/auth", authRoute);
app.use("/users", authenticateMiddleware, userRoute);
app.use("/groups", authenticateMiddleware, groupRoute);
app.use("/posts", authenticateMiddleware, postRoute);

app.use(notFoundMiddleware); // not path will sent to this middleware
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.white.bgBlue.italic.bold(`Server running on port: ${port}`))
);
