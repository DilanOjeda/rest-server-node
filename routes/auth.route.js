
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validateFields } = require('../middlewares/validate-fields');
const { validateRole, validateEmail, validateExistenceIdUser} = require('../helpers/db-validators'); 
const { login } = require('../controllers/auth.controller');

router.post( '/login', [
    check( 'email', 'The email does not have the email format.').isEmail(),
    check( 'password', 'The password must not be empty.').not().isEmpty(),
    validateFields
], login );


module.exports = router;