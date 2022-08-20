const express = require('express');
const questions = require('../database/question.js');
const connectMongoDb = require('../config.js');
const app = express();
const port = 3002;

connectMongoDb();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

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

//Example of questions get

// {
//   product_id: '71697',
//   results: [
//     {
//       question_id: 641733,
//       question_body: 'Why did you like the product or not?',
//       question_date: '2022-06-14T00:00:00.000Z',
//       asker_name: 'Tyler',
//       question_helpfulness: 5,
//       reported: false,
//       answers: [Object]
//     },
//     {
//       question_id: 642599,
//       question_body: 'I wodner how...\nI just do...',
//       question_date: '2022-07-30T00:00:00.000Z',
//       asker_name: 'zz',
//       question_helpfulness: 1,
//       reported: false,
//       answers: {}
//     }
//   }

app.get('/qa/questions', async (req, res) => {
  var productId = req.query.product_id;
  console.log(req.query);
  try {
    var questionData = await questions.find({ product_id: productId });
    // for each question, need to find answers based on that question_id and add in to an object of answers, followed by a key value pair of answer_id : object data
    console.log('this is questions from DB', questionData);
    if (questionData.length > 0) {
      var resultObj = {
        'product_id': productId,
        'results': questionData
      }
      res.status(200);
      res.json(resultObj);
    } else {
      res.status(200);
      res.json({ product_id: productId, results: [] });
    }
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

app.post('/qa/questions', (req, res) => {

});

app.put('/qa/questions/:question_id/helpful', async (req, res) => {
  var questionId = req.query.question_id;
  try {
    var helpfulQuestion = await QuestionsCollection.updateOne(
      { 'results.question_id': questionId },
      { $inc: { 'results.question_helpfulness': 1 } }
      );
      res.status(200);
      res.send('SUCCESS HELPFUL QUESTION UPDATE');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

app.put('/qa/questions/:question_id/report', async (req, res) => {
  var questionId = req.query.question_id;
  try {
    var reportedQuestion = await QuestionsCollection.updateOne(
      { 'results.question_id': questionId },
      { $set: { 'results.reported': true } }
      );
      res.status(200);
      res.send('Question Reported');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

/*
  Answer routes
*/

app.get('/qa/questions/:question_id/answers', (req, res) => {

});

app.post('/qa/questions/:question_id/answers', (req, res) => {

});

app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
  var answerId = req.query.answer_id;
  try {
    var helpfulAnswer = await AnswersCollection.updateOne(
      { 'results.answer_id': answerId },
      { $inc: { 'results.helpfulness': 1 } }
      );
      res.status(200);
      res.send('SUCCESS HELPFUL ANSWER UPDATE');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

app.put('/qa/answers/:answer_id/report', async (req, res) => {
  var answerId = req.query.answer_id;
  try {
    var reportedAnswer = await AnswersCollection.updateOne(
      { 'results.answer_id': answerId },
      { $set: { 'results.reported': true } }
      );
      res.status(200);
      res.send('Answer Reported');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

module.exports = app;