/*
 Imports
*/
const { Router }                = require('express');
const QuestionRouterClass       = require('./questions/question.routes');
const CategoryRouterClass       = require('./categories/category.routes');

/*
Define routers
*/
    // Parent
    const mainRouter        = Router({ mergeParams: true });
    const apiRouter         = Router({ mergeParams: true });

    // Child
    const questionRouter        = new QuestionRouterClass();
    const categoryRouter        = new CategoryRouterClass();

/*
    Routes
*/
    mainRouter.use('/jaser-api', apiRouter);
    apiRouter.use('/questions', questionRouter.init());
    apiRouter.use('/categories', categoryRouter.init());


    module.exports = { mainRouter };

