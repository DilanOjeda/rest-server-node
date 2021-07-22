const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/fields-validation');
const { 
        getUsers,
        postUsers,
        putUsers,
        deleteUsers,
        patchUsers } = require('../controllers/users.controller');
const { validateRole, validateEmail, validateExistenceIdUser } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers );

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

router.put('/:id', [
        check( 'id', 'The _id is not valid.').isMongoId(),
        check( 'id').custom( validateExistenceIdUser ),
        check( 'role' ).custom( validateRole ),
        validateFields
], putUsers );

router.delete('/:id', [
        check( 'id', 'The _id is not valid.').isMongoId(),
        check( 'id').custom( validateExistenceIdUser ),
        validateFields
], deleteUsers );



router.patch('/', patchUsers);

module.exports = router;