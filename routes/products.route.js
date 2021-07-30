
const { Router } = require('express');
const { 
    getProducts, 
    getOneProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct } = require('../controllers/products.controller');
const { 
    validateFields, 
    validateJwt,
    validateUserRole
} = require('../middlewares');

const { validateIdCategoryExistence, validateIdProductExistence } = require('../helpers/db-validators'); 
const { check } = require('express-validator');

const router = Router();


router.get('/', [ validateJwt ], getProducts );

router.get('/:id', [
    validateJwt,
    check( 'id', 'The product ID hast to be an MongoDB ID.').isMongoId(),
    check( 'id' ).custom( validateIdProductExistence ),
    validateFields
], getOneProduct );

router.post('/', [
    validateJwt,
    check( 'name', 'The name must not be empty.' ).not().isEmpty(),
    check( 'category', 'The name must not be empty.' ).not().isEmpty(),
    check( 'category', 'The ID category is not valid.' ).isMongoId(),
    check( 'category' ).custom( validateIdCategoryExistence ),
    validateFields
], createProduct );

router.put('/:id', [
    validateJwt,
    check( 'id', 'The category ID hast to be an ID MongoDB.').isMongoId(),
    check( 'id' ).custom( validateIdProductExistence ),
    check( 'category' ).custom( validateIdCategoryExistence ),
    check( 'name', 'The name is required.').not().isEmpty(),
    validateUserRole,
    validateFields
], updateProduct );

router.delete('/:id', [
    validateJwt,
    check( 'id', 'The category ID hast to be an MongoDB ID.').isMongoId(),
    check( 'id' ).custom( validateIdProductExistence ),
    validateUserRole,
    validateFields
], deleteProduct );

module.exports = router;
