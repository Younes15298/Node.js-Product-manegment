const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null)return res.status(401)

        jwt.verify(token, process.env.TOKEN_KEY, (err,user)=> {
            if(err)return res.senstatus(403)
            req.user= user
            next()
        });
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};