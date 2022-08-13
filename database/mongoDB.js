const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SDC_qna');

const questionSchema = new mongoose.Schema({
  product_id: Number,
  question_id: {type: Number, unique: true}, //unique id
  question_text: String,
  question_date: String, // timestamp variable?
  asker_name: String,
  helpfulness: Number,
  reported: {type: Boolean, default: false},
  answers: {
    answer_id: Number, //unique id
    answer_text: String,
    answer_date: String, // timestamp variable?
    answer_name: String,
    helpfulness: {type: Number, default: 0},
    photos: [ { // populate / check for photos upon submission?
      id: Number,
      url: String
    }]
  }
});

const answerSchema = new mongoose.Schema({
  question_id: Number,
  answer_id: {type: Number, unique: true}, //unique id
  answer_text: String,
  answer_date: String, // timestamp variable?
  answer_name: String,
  reported: {type: Boolean, default: false},
  helpfulness: {type: Number, default: 0},
  photos: [ { // populate / check for photos upon submission?
    id: Number,
    url: String
  }]
});

const questions = mongoose.model('questions', questionSchema);
const answers = mongoose.model('answers', answerSchema);