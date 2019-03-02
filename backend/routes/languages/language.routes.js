// Imports

const express = require('express');
const languageRouter = express.Router();

const { checkFields } = require('../../services/request.checker');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');

const { getAllLanguages,
        getAllQuestionsByLanguage  } = require('./language.controller');

class LanguageRouterClass {
  
    routes() {

        languageRouter.get('/', (req, res) => {
            getAllLanguages()
            .then( apiResponse => sendApiSuccessResponse(res, 'All availibles langues', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during fetch', apiResponse))
            
        })

        languageRouter.get('/:language', (req, res) => {
            getAllQuestionsByLanguage(req.params.language)
            .then( apiResponse => sendApiSuccessResponse(res, 'All Question by language is finded', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during categories search', apiResponse))
        });
        
    }

    init(){
        this.routes();
        return languageRouter;
    }
}

// Export
module.exports = LanguageRouterClass;