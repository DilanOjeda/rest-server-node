
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { login, signinGoogle } = require('../controllers/auth.controller');

const router = Router();

router.post( '/login', [
    check( 'email', 'The email does not have the email format.').isEmail(),
    check( 'password', 'The password must not be empty.').not().isEmpty(),
    validateFields
], login );

router.post( '/google', [
    check( 'id_token', 'Invalid Google token.').not().isEmpty(),
    validateFields
], signinGoogle );


module.exports = router;