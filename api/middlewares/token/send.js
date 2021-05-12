const jwt = require('jsonwebtoken');
const user = require('../../models/user');
const formUser = require('../../utils/formatUser');

const secret = process.env.SECRET

module.exports = (req, res) => {
    console.log("json token send")
    jwt.sign(
        {
            email: req.body.user.email,
            userId: req.body.user.id
        },
        secret,
        (err, token) => {
            if (err) {
                res.status(400);
                res.json({
                    error: "erreur lors de la génération du token !",
                });
            }
            else {
                let user = formUser(req.body.user, req)
                console.log(token)
                res.status(200);
                res.json({
                    token,
                    user: user
                });
            }
        }
    );
}