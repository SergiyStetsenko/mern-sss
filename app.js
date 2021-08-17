const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRouter = require("./routes/auth.routes");
const linkRouter = require("./routes/link.router");
const redirectRouter = require("./routes/redirect.routes");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3002;
// прослойка которая связывет бек и фронт чтобы фронт увидел body
app.use(express.json({ extended: true }));
// регистрация роутов
app.use("/api/auth", authRouter);
app.use("/api/link", linkRouter);
app.use("/t", redirectRouter);
app.get('/connection',(req, res)=>{
  res.json(mongoose.connection.readyState)
})

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "react_repeat", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "react_repeat", "build", "index.html"));
  });
}
console.log("process.env.MONGO_URI", process.env.MONGO_URI);

async function start() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      () => console.log(`DB connect....`)
    );
    
    app.listen(PORT, () => {
      console.log(`App hes been started on port ${PORT}....`);
    });
  } catch (error) {
    console.log("Server Error", error);
    process.exit(1);
  }
}
start();
