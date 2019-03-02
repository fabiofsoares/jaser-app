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

const getQuestionsById = (id, langue) => {
    return new Promise( (resolve, reject) => {
        QuestionModel.find({ _id: id }, {data: { $elemMatch: {langue: langue} }}, { 'data.$': langue },(error, question) => {
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

const getQuestionsByLanguage = (ln) => {
    return new Promise( (resolve, reject) => {
        QuestionModel.find({data: {$elemMatch: {langue: ln}}}, {'data.$': ln}, (error, question) => {
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

const getAllCategories = () => {
    return new Promise( (resolve, reject) => {
        QuestionModel.aggregate([ { $group : { _id : "$category" } } ], (error, question) => {
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
    getQuestionsById,
    postCreateQuestion,
    getAllQuestionsByCategories,
    getQuestionByCategory,
    getQuestionsByLanguage,
    getAllCategories 
}