/*
 Imports
*/
const { Router }                = require('express');
const QuestionRouterClass       = require('./questions/question.routes');
const CategoryRouterClass       = require('./categories/category.routes');
const LanguageRouterClass       = require('./languages/language.routes');

/*
Define routers
*/
    // Parent
    const mainRouter        = Router({ mergeParams: true });
    const apiRouter         = Router({ mergeParams: true });

    // Child
    const questionRouter        = new QuestionRouterClass();
    const categoryRouter        = new CategoryRouterClass();
    const languageRouter        = new LanguageRouterClass();

/*
    Routes
*/
    mainRouter.use('/jaser-api', apiRouter);

    apiRouter.use('/questions', questionRouter.init());
    apiRouter.use('/categories', categoryRouter.init());
    apiRouter.use('/languages', languageRouter.init());


    module.exports = { mainRouter };

