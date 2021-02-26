const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const adminAuthRoutes = require('./admin/routes/auth');
const adminFeedRoutes = require('./admin/routes/feed')
const adminFeedCommon = require('./admin/routes/common')



const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use('/admin/feed', adminFeedRoutes);
app.use('/admin/auth', adminAuthRoutes);
app.use('/admin/common', adminFeedCommon);



app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//mongodb+srv://ship:ship12345@cluster0-r3cso.mongodb.net/blog-post-demo?retryWrites=true&w=majority
//
const port  = process.env.PORT || 8080;
mongoose
  .connect(
    'mongodb+srv://ship:ship12345@cluster0-r3cso.mongodb.net/codemedium?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(port, ()=>{
      console.log("**********Running on***********", port)
    });
  })
  .catch(err => console.log("********Error in connection********",err));
