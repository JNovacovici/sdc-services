const express = require('express');
const questions = require('../database/question.js');
const answers = require('../database/answers.js');
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
  var results = [];
  var productId = req.query.product_id;
  // console.log(req.query);
  try {
    var questionData = await questions.find({ product_id: productId });
    questionData = questionData.map(question => question.toJSON());
    // for each question, need to find answers based on that question_id and add in to an object of answers, followed by a key value pair of answer_id : object data
    // console.log('this is questions from DB', questionData);
    if (questionData.length > 0) {
      for (var i = 0; i < questionData.length; i++) {
        var questionId = questionData[i].question_id;
        var answerData = await answers.find({ question_id: questionId });
        answersObj = {};
        for (var j = 0; j < answerData.length; j++) {
          //create key value pair of answer_id : object of data related to that answer_id
          const answer = answerData[j].toJSON();
          answer['photos'] = eval(answer['photos']);
          answersObj[answerData[j].id] = answer;
        }
        //push into question object of the key 'answers' and value of inner data
        questionData[i]['answers'] = answersObj;
      }
      var resultObj = {
        'product_id': productId,
        'results': questionData
      }
      // console.log( resultObj.results);
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

app.post('/qa/questions', async (req, res) => {
  try {
    var newQuestion = await questions.create({question_body: req.body.body, asker_name: req.body.name, asker_email: req.body.email, product_id: req.body.product_id});
    res.status(201);
    res.send('Question created');
  } catch (err) {
    console.log(req.body);
    res.status(400);
    res.send(err.message);
  }
});

app.put('/qa/questions/:question_id/helpful', async (req, res) => {
  var questionId = req.params.question_id;
  console.log('entering the helpful question button');
  try {
    var helpfulQuestion = await questions.updateOne(
      { 'question_id': questionId },
      { $inc: { 'question_helpfulness': 1 } }
      );
      res.status(204);
      res.send('SUCCESS HELPFUL QUESTION UPDATE');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

app.put('/qa/questions/:question_id/report', async (req, res) => {
  var questionId = req.params.question_id;
  console.log('entering the report question button');
  try {
    var reportedQuestion = await questions.updateOne(
      { 'question_id': questionId },
      { $set: { 'reported': true } }
      );
      res.status(204);
      res.send('Question Reported');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

/*
  Answer routes
*/

app.post('/qa/questions/:question_id/answers', async (req, res) => {
  try {
    var newAnswer = await answers.create({ body: req.body.body, answerer_name: req.body.name, answerer_email: req.body.email, photos: req.body.photos, question_id: req.params.question_id});
    // console.log(newAnswer);
    // console.log('these are the photos', req.body.photos);
    res.status(201);
    res.send('Answer created');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
  var answerId = req.params.answer_id;
  console.log('entering the helpful answer button');
  try {
    var helpfulAnswer = await answers.updateOne(
      { 'id': answerId },
      { $inc: { 'helpfulness': 1 } }
      );
      res.status(204);
      res.send('SUCCESS HELPFUL ANSWER UPDATE');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

app.put('/qa/answers/:answer_id/report', async (req, res) => {
  var answerId = req.params.answer_id;
  console.log('entering the report answer button');
  try {
    var reportedAnswer = await answers.updateOne(
      { 'id': answerId },
      { $set: { 'reported': true } }
      );
      res.status(204);
      res.send('Answer Reported');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

module.exports = app;