// Imports

const express = require('express');
const categoryRouter = express.Router();

const { checkFields } = require('../../services/request.checker');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');

const { getAllCategories,
        getAllQuestionsByCategories,
        getQuestionByCategory } = require('./category.controller');

class CategoryRouterClass {
    
  
    routes() {

        categoryRouter.get('/', (req, res) => {
            getAllCategories()
            .then( apiResponse => sendApiSuccessResponse(res, 'Categories received', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during fetch', apiResponse))
            
        })

        categoryRouter.get('/:category', (req, res) => {
            getAllQuestionsByCategories(req.params.category.split('-'))
            .then( apiResponse => sendApiSuccessResponse(res, 'Question  by categoryes is finded', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during categories search', apiResponse))
        });

        categoryRouter.get('/:category/:langue', (req, res) => {
            getQuestionByCategory(req.params.category.split('-'), req.params.langue)
            .then( apiResponse => sendApiSuccessResponse(res, 'Question by category received', apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, 'Error during fetch', apiResponse))
        })
        
    }

    init(){
        this.routes();
        return categoryRouter;
    }
}

// Export
module.exports = CategoryRouterClass;