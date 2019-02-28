const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Model definition
*/
const questionSchema = new Schema({
    date_creation: Date,
    category: String,
    questions: [
        {
            langue: String,
            question: String
        }
    ]
})

/* Export */
const QuestionModel = mongoose.model('question', questionSchema);
module.exports = QuestionModel;