// Imports

const express = require('express');
const questionRouter = express.Router();

const { checkFields } = require('../../services/request.checker');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
const { getAllQuestions, getQuestionById, postCreateQuestion, getQuestionsByCategories, getQuestionsByLanguage } = require('./question.controller');

class QuestionRouterClass {
    
  
    routes() {

        questionRouter.get('/', (req, res) => {
            getAllQuestions()
            .then( apiResponse => sendApiSuccessResponse(res, 'Question received', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during fetch', apiResponse))
            
        })

        questionRouter.get('/question/:id', (req, res) => {
            getQuestionById(req.params.id)
            .then( apiResponse => sendApiSuccessResponse(res, 'Question by ID received', apiResponse) )
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

        questionRouter.post('/categories', (req, res) => {
            // Error: no body present
            if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'No body data provided') }
            // Check fields in the body
            const { miss, extra, ok } = checkFields(['categories'], req.body);
            //=> Error: bad fields provided
            if (!ok) { sendFieldsError(res, 'Bad fields provided', miss, extra) }
            //=> Request is valid: use controller
            else{
                getQuestionsByCategories(req.body, res)
                .then( apiResponse => sendApiSuccessResponse(res, 'Question  by categoryes is finded', apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, 'Error during categories search', apiResponse))
            }
        });

        questionRouter.get('/:langue', (req, res) => {
            getQuestionsByLanguage(req.params.langue)
            .then( apiResponse => sendApiSuccessResponse(res, 'Question by language received', apiResponse) )
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