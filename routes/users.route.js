const { Router } = require('express');
const router = Router();
const { 
        getUsers,
        postUsers,
        putUsers,
        deleteUsers,
        patchUsers } = require('../controllers/users.controller');


router.get('/', getUsers );

router.put('/', putUsers );

router.delete('/', deleteUsers );

router.post('/', postUsers );

router.patch('/', patchUsers);

module.exports = router;