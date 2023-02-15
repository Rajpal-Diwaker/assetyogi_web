const jwt = require('jsonwebtoken');
const util = require('../Utilities/util');
const userDAO = require('../DAO/userDAOEncrypt');
const enc = require('../Utilities/sendEncrypt');

const auth = {
    verifyToken: (req, res, next) => {
        if (!req.headers.access_token || req.headers.access_token == "" || req.headers.access_token == "") {
            res.send({ "code": "401", "message": "Provide access token " });
            return;
        }
        jwt.verify(req.headers.access_token, util.secret, (err, decoded) => {
            if (err) {
                res.send({ "code": util.statusCode.ACCESS_TOKEN_ERR, "message": util.statusMessage.ACCESS_TOKEN_ERR, "error": err });
                return;
            } else {

                if (decoded.user_id) {
                    userDAO.getUsers(decoded, (err, result) => {
                        if (err) {
                            res.send({ "code": util.statusCode.ACCESS_TOKEN_ERR, "message": util.statusMessage.ACCESS_TOKEN_ERR, "error": err });
                            return;
                        }
                        else {
                            if (result[0].status == '0' || result[0].status == 0) {
                                res.send(enc.SEND({ "code": util.statusCode.BLOCKED_FROM_ADMIN, "message": util.statusMessage.DISABLED_FROM_ADMIN }));
                                return;
                            }
                            else if (result[0].status == '2' || result[0].status == 2) {
                                res.send(enc.SEND({ "code": util.statusCode.BLOCKED_FROM_ADMIN, "message": util.statusMessage.USER_NOT_EXITS }));
                                return;
                            }
                            else {
                                req.body.decodedData = decoded;
                                next();
                            }
                        }
                    })
                }
                else {
                    req.body.decodedData = decoded;
                    next();
                }
            }
        })
    }
};



module.exports = auth;