const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const answerSchema = new mongoose.Schema({
  id: {type: Number, unique: true}, //unique id
  question_id: Number,
  body: String,
  answerer_name: String,
  answerer_email: String,
  reported: {type: Boolean, default: false},
  date: {type: Date, default: Date.now}, // {type: String, default: new Date().toISOString()}  timestamp variable?
  helpfulness: {type: Number, default: 0},
  photos: [String]
});

answerSchema.plugin(AutoIncrement, {
  inc_field: 'id', start_seq: 6879307
});

module.exports = mongoose.model('answers', answerSchema);