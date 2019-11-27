const express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');

const isProduction = process.env.NODE_ENV === 'production';
require('dotenv').config({path: 'variables.env'});

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

// serve static files from the react app
app.use(express.static(path.join(__dirname, 'client/build')));

/// routing
// TODO: replace with routes and controllers
app.get('/api/tasks', (req, res) => {
  const tasks = [
    {
      id: 4545,
      description: 'Take polling places down after election',
      end_date: '2020-03-03',
      end_days_to_election: 45,
      election_name: 'Sample Election',
      election_id: 1,
      created_at: Date.now(),
      updated_at: Date.now(),
      status: 'Not Started',
      notifications_on: true,
      code: 'ef-44-011'
    },
    {
      id: 363,
      description: "Open new drawer to see what's in there",
      end_date: '2020-04-03',
      end_days_to_election: 15,
      election_name: 'Sample Election',
      election_id: 1,
      created_at: Date.now(),
      updated_at: Date.now(),
      status: 'Not Started',
      notifications_on: true,
      code: 'ef-922-000'
    },
    {
      id: 3511,
      description:
        'Going with what customers already know can be a really great thing.',
      begin_date: '2020-04-01',
      end_date: '2020-04-05',
      begin_days_to_election: 11,
      end_days_to_election: 15,
      election_name: 'Sample Election',
      election_id: 1,
      created_at: Date.now(),
      updated_at: Date.now(),
      status: 'In Progress',
      notifications_on: true,
      code: 'pi-022-910'
    }
  ];

  res.json(tasks);
});

/// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
