// Imports
const QuestionModel = require('../../models/question.model')

//Methods

const getAllLanguages = () => {
    return new Promise( (resolve, reject) => {
        QuestionModel.aggregate([ { $group : { "_id" : "$data.langue" } } ], (error, question) => {
            if(error) reject(error)
            else {
                return resolve(question)
            }
        })
    })
}

const getAllQuestionsByLanguage = (ln) => {
    return new Promise( (resolve, reject) => {
        QuestionModel.find( { data: { $elemMatch: { langue: ln }} }, { category: 1, 'data.$': ln }, (error, question) => {
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
    getAllLanguages,
    getAllQuestionsByLanguage 
}