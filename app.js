// https://oauth.vk.com/authorize?client_id=7892561&display=page&redirect_uri=&scope=photos&response_type=token&v=5.52
// https://oauth.vk.com/blank.html#access_token=aa870ca69502b476d050f7b65f2e926ba24b2e9fa11181aeebe601fbc901ad1264d50b76471bec912ea6a&expires_in=86400&user_id=64418327 
// aa870ca69502b476d050f7b65f2e926ba24b2e9fa11181aeebe601fbc901ad1264d50b76471bec912ea6a

// https://oauth.vk.com/blank.html#access_token=9c847983b5abd7d2291585b3c5fc3af5645fa136d5d88c4a48e7d3558d45802abae973b72c6dc0c06626c&expires_in=86400&user_id=64418327
// 9c847983b5abd7d2291585b3c5fc3af5645fa136d5d88c4a48e7d3558d45802abae973b72c6dc0c06626c
// https://oauth.vk.com/blank.html#access_token=90000f93e3efb97339251953282aa81ce286a2e5bf65e51fa91164feb6c018afaa836fc2c719bbe789834&expires_in=86400&user_id=64418327
// 90000f93e3efb97339251953282aa81ce286a2e5bf65e51fa91164feb6c018afaa836fc2c719bbe789834

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const connect = require("./db/connect");
const FanModel = require('./db/models/FanModel')

const session = require("express-session");
const FileStore = require("session-file-store")(session);

const port = process.env.PORT || 3000;
const app = express();

connect();

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new FileStore(),
    key: "user_sid",
    secret: "sobaka",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 9000000,
      httpOnly: true,
    },
  })
);

app.get('/', (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.render("photo");
  } else {
    res.render("photo");
  }
})

//регистрация
app.get("/registration", (req, res) => {
  res.render("registration", { layout: false });
});

app.post("/registration", async(req, res) => {
  const { name, email, instagram, password } = req.body;
  const findFan = await FanModel.findOne({ email });
  if (findFan !== null) {
    res.json({err: true});
  } else {
     const newFan = new FanModel({
       name,
       email,
       instagram,
       password,
     });
     newFan.save();
     req.session.user = newFan;
     res.json({err: false, name: req.session.user.name});
  }
});

//рендер на главную страницу
app.get("/SuperPuper/:id", (req, res) => {
  res.render('photo', {name: req.session.user.name})
});

//логин
app.get('/login', (req, res) => {
  res.render('login', {layout: false})
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const findFan = await FanModel.findOne({ email });
  console.log(findFan);
  if (findFan === null || password !== findFan.password) {
    res.json({err: true})
  } else {
    req.session.user = findFan;
    res.json({ err: false, name: req.session.user.name });
  }
})

app.listen(port, () => {
  console.log("Сервер запущен");
});
