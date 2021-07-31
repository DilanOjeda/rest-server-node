
const { Router } = require('express');

const router = Router();



const { searcher } = require('../controllers/search.controller');

router.get('/:collection/:term', searcher );






module.exports = router;