
const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);   //return an object array of errors.
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();     // if the condiction (if) do not receive, next() will continue the following function. 
}

module.exports = {
    validateFields
}