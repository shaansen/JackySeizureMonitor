const express = require("express");
// const mongoose = require("mongoose");
// const cookieSession = require("cookie-session");
// const passport = require("passport");
// const keys = require("./config/keys");
// require("./models/user");
// require("./services/passport");

// mongoose
//   .connect(keys.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log(`MongoDB Connected…`);
//   })
//   .catch((err) => console.log(err));

const app = express();

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey],
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// const authRoutes = require("./routes/authRoutes");
// authRoutes(app);

app.get("/", (req, res) => {
  res.send({ test: "gasdasda" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
