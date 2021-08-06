const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const authRouter = require("./routes/auth.routes");
const linkRouter = require("./routes/link.router");
const redirectRouter = require("./routes/redirect.routes");

const app = express();

const PORT = config.get("port") || 3002;
// прослойка которая связывет бек и фронт чтобы фронт увидел body
app.use(express.json({ extended: true }));
// регистрация роутов
app.use("/api/auth", authRouter);
app.use("/api/link", linkRouter);
app.use("/t", redirectRouter);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "react_repeat", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "react_repeat", "build", "index.html")
    );
  });
}
async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`App hes been started on port ${PORT}....`);
    });
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1);
  }
}
start();
