const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const questionSchema = new mongoose.Schema({
  product_id: {type: Number, required: true},
  results: [
    {
      question_id: {type: Number, unique: true}, //unique id
      question_body: String,
      question_date: {type: Date, default: Date.now}, // timestamp variable?
      asker_name: String,
      question_helpfulness: {type: Number, default: 0},
      reported: {type: Boolean, default: false},
      answers: {default: {}}
    }
  ]
}, {minimize: false});

// questionSchema.plugin(AutoIncrement, {
//   inc_field: 'question_id', start_seq: 3518964
// });

// let questions = mongoose.model('questions', questionSchema);

// let getQuestions = async (productId) => {
//   questionList = await questions.find({product_id: productId}).exec();
//   return questionList;
// }

module.exports = mongoose.model('questions', questionSchema);
// module.exports.getQuestions = getQuestions;