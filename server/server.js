const express = require('express');
const app = express();
const port = 3000;

app.get('/qna', (req, res) => {
  res.json({getQnA: 'QnA get test check'});
});

app.post('/qna', (req, res) => {
  res.json({postQnA: 'QnA post test check'});
});

module.exports = app;