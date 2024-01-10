//imports
const path = require("path")
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const xssClean = require("xss-clean");
const reateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { client_url } = require("./config/config");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const seedRouter = require("./routes/seedRouter");

const verificationRouter = require("./routes/verification");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const routineRouter = require("./routes/routineRouter");
const studentRouter = require("./routes/studentRouter");
const teacherRouter = require("./routes/teacherRouter");
const resultRouter = require("./routes/resultRouter");
const syllabusRouter = require("./routes/syllabusRouter");

//
const app = express();

//rate limiter

const rateLimiter = reateLimit({
  windowMS: 1000 * 60 * 56,
  max: 50,
  message: (req, res, next, opt) => {
    res.status(400).json({
      error: {
        limit: {
          message: "too many request from this IP , please try again later",
        },
      },
    });
  },
});

//appconst uploads_folder = path.join(
console.log(path.join(__dirname, "../public"));
app.use(express.static(path.join(__dirname, "../../public"), {
  setHeaders: (res, path) => {

    res.setHeader('Content-Disposition', 'attachment')
  }
}))

app.use(
  cors({
    origin: client_url,
    credentials: true,
  })
);
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(xssClean());
app.get("/test", (req, res, next) => {
  console.log(req)
  res.status(200);

  res.json({
    message: "api is working fine 🧐",
    data: req.ip,
  });
});

//internal
app.use("/api/users/", seedRouter);
app.use('/api/user/', userRouter)
app.use("/api/verification", verificationRouter);
app.use('/api/auth', authRouter)
app.use('/api/routine', routineRouter)
app.use('/api/student', studentRouter)
app.use('/api/syllabus', syllabusRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/result', resultRouter)


//error handler
app.use(notFoundHandler);
app.use(errorHandler);

//export
module.exports = app;
