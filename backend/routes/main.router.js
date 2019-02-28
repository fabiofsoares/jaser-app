/*
 Imports
*/
const { Router }                = require('express');
const QuestionRouterClass       = require('./questions/question.routes');

/*
Define routers
*/
    // Parent
    const mainRouter        = Router({ mergeParams: true });
    const apiRouter         = Router({ mergeParams: true });

    // Child
    const questionRouter        = new QuestionRouterClass();

/*
    Routes
*/
    mainRouter.use('/jaser-api', apiRouter);
    apiRouter.use('/question', questionRouter.init());


    module.exports = { mainRouter };

