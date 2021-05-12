const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET

module.exports = (req, res, next) => {
    let token = req.headers.authorisation.split(' ')[1]
    console.log(token)
    jwt.verify(token, SECRET, (err, result)=>{
        console.log('CJHECK TOKEN', result)
        result ?  next() : res.status(401).json({message: "Vous n'êtes pas authoriser a visiter cet url"})
    })
}