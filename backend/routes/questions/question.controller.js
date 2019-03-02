// Imports
const QuestionModel = require('../../models/question.model')

//Methods

const postCreateQuestion = (body) => {
    return new Promise((resolve, reject) => {
        const newQuestion = {
            date_creation: new Date(),
            category: body.category,
            data: [
                {
                    langue: 'pt',
                    question: body.pt
                },
                {
                    langue: 'fr',
                    question: body.fr
                },
                {
                    langue: 'en',
                    question: body.en
                },
                {
                    langue: 'es',
                    question: body.es
                }
            ]
        }

        QuestionModel.create(newQuestion)
        .then(mongoResponse => resolve(mongoResponse))
        .catch(mongoResponse => reject(mongoResponse))
    })
}

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

const getAllQuestionsById = (id) => {
    return new Promise( (resolve, reject) => {
        QuestionModel.findById(id, (error, question) => {
            if(error) reject(error)
            else {
                return resolve(question)
            }
        })
    })
}

const getQuestionById = (id, langue) => {
    return new Promise( (resolve, reject) => {
        QuestionModel.find({ _id: id }, {category: 1, data: { $elemMatch: {langue: langue} }}, { 'data.$': langue },(error, question) => {
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
    getAllQuestionsById,
    getQuestionById,
    postCreateQuestion
}