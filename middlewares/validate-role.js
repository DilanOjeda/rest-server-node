const { request, response } = require("express");



const validateUserRole = (req = request, res = response, next) => {

    if ( !req.userAuth ){           // req.userAuth comes from validateJwt()
        return res.status(500).json({
            msg: 'It is required to validate the token before verifying the role.'
        });
    }
    const {name, role } = req.userAuth;
    if ( role !== 'ADMIN_ROLE' ){
        return res.status(500).json({
            msg: `${name} is not administrator - can not do this action.`
        });
    }

    next();
}

// Other way to validate roles differnt from validateUserRole
const  hasRole = (...roles) => {

    return (req, res, next) => {
        if ( !req.userAuth ){               // req.userAuth comes from validateJwt()
            return res.status(500).json({
                msg: 'It is required to validate the token before verifying the role.'
            });
        }

        if ( !roles.includes(req.userAuth.role) ){
            return res.status(401).json({
                msg: `The service required one of these roles: ${ roles }`
            })
        }

        next();
    }

}


module.exports = {
    validateUserRole,
    hasRole
}