import { Router } from "express";
import { fetchControl } from '../controllers/control'
import { postForm } from '../controllers/form'
// const formPostController = require('../controllers/formPost');
// const reportController = require('../controllers/report');

const form = Router();

/**
    - Post -> /api/form/[menuParams]
    - To fetch all the controls of the form
*/
form.post('/:menuParams',fetchControl);


/**
    - POST -> /api/form
    - To post the data to the Database
*/
form.post('/',postForm);


/**
    - POST -> /api/form/view
    - To view the report like data, After submitting some value in the form
    - We will be sending data as response to the clients,According to the form post
*/
// form.post('/view',reportController.getReport);


/**
    - POST -> /api/form/add
*/

/**
    - POST -> /api/form/print
*/

/**
    - POST -> /api/form/report
*/


export default form;
