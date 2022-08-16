const express = require('express');
const app = express();
const port = 3000;

// product id will be req.query.productId

app.get('/qna', (req, res) => {
  res.json({getQnA: 'QnA get test check'});
});

app.post('/qna', (req, res) => {
  res.json({postQnA: 'QnA post test check'});
});

/*
  Question routes
*/

app.get('/qa/questions', (req, res) => {
  var id = req.query.productId;
});

app.post('/qa/questions', (req, res) => {

});

app.put('/qa/questions/:question_id/helpful', (req, res) => {

});

app.put('/qa/questions/:question_id/report', (req, res) => {

});

/*
  Answer routes
*/

app.get('/qa/questions/:question_id/answers', (req, res) => {

});

app.post('/qa/questions/:question_id/answers', (req, res) => {

});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {

});

app.put('/qa/answers/:answer_id/report', (req, res) => {

});

module.exports = app;