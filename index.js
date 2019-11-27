const express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());

// express defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/conduit');
  mongoose.set('debug', true);
}

app.use(express.static(path.join(__dirname, 'client/build')));
