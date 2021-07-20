const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validateFields } = require('../middlewares/fields-validation');
const { 
        getUsers,
        postUsers,
        putUsers,
        deleteUsers,
        patchUsers } = require('../controllers/users.controller');
const { validateRole,
        validateEmail } = require('../helpers/db-validators');

router.get('/', getUsers );

router.put('/:id', putUsers );

router.delete('/', deleteUsers );

router.post('/',[
        check( 'name', 'The name must not be empty.' ).not().isEmpty(),
        check( 'email', 'The email does not have the email format.' ).isEmail(),
        check( 'email' ).custom( validateEmail ),
        check( 'password', 'The password must be at least 6 characters.' ).isLength({ min: 6 }),
        // check( 'role', 'The role is not an available role.').isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),
        // check( 'role').custom( (role) => validateRole(role) ),
        check( 'role' ).custom( validateRole ),               //In a short way

        validateFields
] , postUsers );

router.patch('/', patchUsers);

module.exports = router;