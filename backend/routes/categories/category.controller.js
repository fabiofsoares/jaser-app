// Imports
const QuestionModel = require('../../models/question.model')

//Methods

const getAllCategories = () => {
    return new Promise( (resolve, reject) => {
        QuestionModel.aggregate([ { $group : { "_id" : "$category" } } ], (error, question) => {
            if(error) reject(error)
            else {
                return resolve(question)
            }
        })
    })
}

const getAllQuestionsByCategories = (categories) => {
    return new Promise( (resolve, reject) => {
        QuestionModel.find({ category: { $in: categories } }, (error, question) => {
            if(error) reject(error)
            else {
                let questionArray = [];                
                ((async function loop(){
                    for(let i = 0; i < question.length; i++){
                        questionArray.push(question[i])
                    }
                    return resolve(questionArray)
                })());
            }
        })
    })
}

const getQuestionByCategory = (categories, langue) => {
    return new Promise( (resolve, reject) => { 
        QuestionModel.find({ category: { $in: categories } },{data: { $elemMatch: {langue: langue} }}, { 'data.$': langue }, (error, question) => {
            if(error) reject(error)
            else {
                let questionArray = [];                
                ((async function loop(){
                    for(let i = 0; i < question.length; i++){
                        questionArray.push(question[i])
                    }
                    return resolve(questionArray)
                })());
            }
        })
    })
}



//Export
module.exports = {
    getAllQuestionsByCategories,
    getQuestionByCategory,
    getAllCategories 
}