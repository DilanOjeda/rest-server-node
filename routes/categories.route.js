const { Router } = require('express');
const { check } = require('express-validator');

const {
    getCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller');

const { validateIdCategoryExistence } = require('../helpers/db-validators');
const { 
    validateFields, 
    validateJwt,
    hasRole
} = require('../middlewares');

const router = Router();


router.get( '/', [ validateJwt ], getCategories );

router.get( '/:id', [
    validateJwt,
    check( 'id', 'The category ID hast to be an MongoDB ID.').isMongoId(),
    check( 'id' ).custom( validateIdCategoryExistence ),
    validateFields
], getOneCategory );

router.post( '/', [
    validateJwt,
    check( 'name', 'The name is required.').not().isEmpty(),
    validateFields
], createCategory );

router.put( '/:id', [
    validateJwt,
    check( 'id', 'The category ID hast to be an MongoDB ID.').isMongoId(),
    check( 'id' ).custom( validateIdCategoryExistence ),                      // TODO fix validateIdCate...
    check( 'name', 'The name is required.').not().isEmpty(),
    validateFields
], updateCategory );

router.delete( '/:id', [
    validateJwt,
    hasRole('ADMIN_ROLE'),
    check( 'id', 'The category ID hast to be an MongoDB ID.').isMongoId(),
    check( 'id' ).custom( validateIdCategoryExistence ),
    validateFields
], deleteCategory );

module.exports = router;