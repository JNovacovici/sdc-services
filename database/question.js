const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const questionSchema = new mongoose.Schema({
  product_id: {type: Number, required: true},
  question_id: {type: Number, unique: true}, //unique id
  question_body: String,
  question_date: {type: Date, default: Date.now}, // timestamp variable?
  asker_name: String,
  question_helpfulness: {type: Number, default: 0},
  reported: {type: Boolean, default: false},
  answers: {default: {}}
});

questionSchema.plugin(AutoIncrement, {
  inc_field: 'question_id', start_seq: 3518964
});

module.exports = mongoose.model('questions', questionSchema);