


const getUsers = (req, res) => {
    const { id, name = 'No name', page } = req.query;
    console.log(req.query);
    res.json({
        msg: ' get API',
        id,
        name,
        page
    });
}

const postUsers = (req, res) => {
    
    const { name, age } = req.body;
    res.json({
        msg: ' post Api',
        name,
        age
    });
}

const putUsers = (req, res) => {
    res.json({
        msg: ' put api'
    });
}

const deleteUsers = (req, res) => {
    res.json({
        msg: ' delete api'
    });
}

const patchUsers = () => {
    res.json({
        msg: ' patch api'
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    patchUsers
};