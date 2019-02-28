// Imports

const express = require('express');
const questionRouter = express.Router();

const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
const { getAllQuestions, getQuestionById } = require('./question.controller');

class QuestionRouterClass {
    
  
    routes() {

        questionRouter.get('/', (req, res) => {
            getAllQuestions()
            .then( apiResponse => sendApiSuccessResponse(res, 'Events received', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during fetch', apiResponse))
            
        })

        questionRouter.get('/:id', (req, res) => {
            getQuestionById(req.params.id)
            .then( apiResponse => sendApiSuccessResponse(res, 'Event received', apiResponse) )
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