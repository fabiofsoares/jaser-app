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

const getQuestionsByCategories = (body) => {
    return new Promise( (resolve, reject) => {
        QuestionModel.find({ category: { $in: body.categories } }, (error, question) => {
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
    //console.log(ln)
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

// langue et category
//db.questions.find({category:"experience"},{data: {$elemMatch: {langue: "fr"}}}, {'data.$': "fr"})


//Export
module.exports = {
    getAllQuestions,
    getQuestionById,
    postCreateQuestion,
    getQuestionsByCategories,
    getQuestionsByLanguage 
}