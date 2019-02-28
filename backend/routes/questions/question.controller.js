// Imports
const QuestionModel    = require('../../models/question.model')

//Methods

const getAllQuestions = () => {
    return new Promise( (resolve, reject) => {
        QuestionModel.find((error, question) => {
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

const getQuestionById = (id) => {
    return new Promise( (resolve, reject) => {
        QuestionModel.findById(id, (error, question) => {
            if(error) reject(error)
            else {
                return resolve(question)
            }
        })
    })
}


//Export
module.exports = {
    getAllQuestions,
    getQuestionById
}