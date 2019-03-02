// Imports

const express = require('express');
const questionRouter = express.Router();

const { checkFields } = require('../../services/request.checker');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');

const { getAllQuestions,
        getAllQuestionsById,
        getQuestionById, 
        postCreateQuestion } = require('./question.controller');

class QuestionRouterClass {

    routes() {

        questionRouter.get('/', (req, res) => {
            getAllQuestions()
            .then( apiResponse => sendApiSuccessResponse(res, 'All questions received', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during fetch', apiResponse))
            
        })

        questionRouter.post('/', (req, res) => {
            // Error: no body present
            if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'No body data provided') }
            // Check fields in the body
            const { miss, extra, ok } = checkFields(['category', 'pt', 'fr', 'en', 'es'], req.body);
            //=> Error: bad fields provided
            if (!ok) { sendFieldsError(res, 'Bad fields provided', miss, extra) }
            //=> Request is valid: use controller
            else{
                postCreateQuestion(req.body, res)
                .then( apiResponse => sendApiSuccessResponse(res, 'Question is created', apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, 'Error during question created', apiResponse))
            }
        });

        questionRouter.get('/:id', (req, res) => {
            getAllQuestionsById(req.params.id)
            .then( apiResponse => sendApiSuccessResponse(res, 'All questions by ID received', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during fetch', apiResponse))
        })

        questionRouter.get('/:id/:langue', (req, res) => {
            getQuestionById(req.params.id, req.params.langue)
            .then( apiResponse => sendApiSuccessResponse(res, 'Question by ID and language received', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during fetch', apiResponse))
        })
        
    }

    init(){
        this.routes();
        return questionRouter;
    }
}

// Export
module.exports = QuestionRouterClass;