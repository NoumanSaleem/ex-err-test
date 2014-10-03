var async = require('async'),
    express = require('express');

var app = express();

app.use('/test/:id', function (req, res, next) {
  var tasks = [];

  tasks.push(function (cb) {
    cb(new Error('task failed'));
  });

  tasks.push(function (cb) {
    setTimeout(function () {
      console.log(req.params.id);
      cb();
    }, 1000);
  });

  async.parallel(tasks, function (err, result) {
    if (err) return next(err);
  });
});

app.use(function (err, req, res, next) {
  // toggle these
  res.send('Error happened');
  // next(err);
});

app.listen(3000);