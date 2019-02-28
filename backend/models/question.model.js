/*
Imports & configs
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
//


/*
Model definition
*/
const questionSchema = new Schema({
    author: String,
    date_creation: Date,
    category: String,
    questions: [
        {
            langue: String,
            question: String
        }
    ]
    
})
//


/*
Export
*/
const QuestionModel = mongoose.model('question', questionSchema);
module.exports = QuestionModel;
//