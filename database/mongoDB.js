const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.connect('mongodb://localhost/SDC_qna');

const questionSchema = new mongoose.Schema({
  question_id: {type: Number, unique: true}, //unique id
  product_id: Number,
  body: String,
  date_written: {type: String, default: new Date().toISOString()}, // timestamp variable?
  asker_name: String,
  asker_email: String,
  reported: {type: Boolean, default: false}
  helpful: {type: Number, default: 0}
});

questionSchema.plugin(AutoIncrement, {
  inc_field: 'question_id', start_seq: 3518964
});

const answerSchema = new mongoose.Schema({
  question_id: Number,
  answer_id: {type: Number, unique: true}, //unique id
  body: String,
  date_written: {type: String, default: new Date().toISOString()}, // timestamp variable?
  answerer_name: String,
  answerer_email: String,
  reported: {type: Boolean, default: false},
  helpful: {type: Number, default: 0},
  photos: [] // populate / check for photos upon submission?
});

answerSchema.plugin(AutoIncrement, {
  inc_field: 'answer_id', start_seq: 6879307
});

const photosSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  answer_id: Number,
  url: String
})

photosSchema.plugin(AutoIncrement, {
  inc_field: 'id', start_seq: 2063760
});

const questions = mongoose.model('questions', questionSchema);
const answers = mongoose.model('answers', answerSchema);
const photos = mongoose.model('photos', photosSchema);