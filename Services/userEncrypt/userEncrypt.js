let async = require('async'),
    util = require('../../Utilities/util'),
    jwt = require('jsonwebtoken'),
    config = require('../../Utilities/config').config,
    Cryptr = require('cryptr'),
    cryptr = new Cryptr(process.env.main_key),
    multiparty = require('multiparty'),
    _ = require('lodash'),
    dbConfig = require("../../Utilities/dbConfig"),
    userDAO = require("../../DAO/userDAOEncrypt"),
    moment = require('moment');

let signIn = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.phone || !data.country_code) {
                cb(null, {
                    "code": util.statusCode.BAD_REQUEST,
                    "message": util.statusMessage.PARAMS_MISSING
                })
                return;
            }
            let criteria = {
                phone: data.phone,
                country_code: data.country_code
            }
            userDAO.getUsers(criteria, (err, dbData) => {
                if (err) {
                    cb(null, {
                        "code": util.statusCode.FOUR_ZERO_ZERO,
                        "message": util.statusMessage.DB_ERROR
                    });
                    return;
                } else if (dbData && dbData.length) {

                    if (dbData[0].status == '0' || dbData[0] == 0) {
                        res.send({ "code": util.statusCode.BLOCKED_FROM_ADMIN, "message": util.statusMessage.DISABLED_FROM_ADMIN });
                        return;
                    }
                    let resultantArr = {
                        "user_id": dbData[0].user_id,
                        "user_name": dbData[0].user_name ? (dbData[0].user_name).toString() : '',
                        "email": dbData[0].email ? (dbData[0].email).toString() : '',
                        "country_code": dbData[0].country_code ? dbData[0].country_code.toString() : '',
                        "phone": dbData[0].phone ? (dbData[0].phone).toString() : '',
                        "image": dbData[0].image ? dbData[0].image : '',
                    }
                    let token = jwt.sign({
                        user_id: dbData[0].user_id
                    }, util.secret);
                    resultantArr.acesstoken = token;
                    resultantArr.profile_status = resultantArr.email != "" ? "1" : "0";

                    let str = data.phone.toString();
                    let message = util.statusMessage.LOGIN_SUCCESS + " XXXX" + str.slice(str.length - 4, str.length);
                    cb(null, {
                        "code": util.statusCode.OK,
                        "message": message,
                        result: resultantArr
                    });

                    //Update AccessToken
                    dbConfig.getDB().query(`update users set access_token = ? where user_id = ?`, [token, resultantArr.user_id], (err, dbData) => {
                        return
                    })
                    return;
                } else if (dbData && dbData.length == 0) {
                    let userData = {
                        "status": '1',
                        "phone": data.phone,
                        "country_code": data.country_code,
                        "phone_otp": util.getDigits(),
                        "phone_otp_time": moment().format("YYYY-MM-DD hh:mm:ss"),
                        "created_at": moment().format("YYYY-MM-DD hh:mm:ss"),
                        "updated_at": moment().format("YYYY-MM-DD hh:mm:ss")
                    }
                    userDAO.createUser(userData, (err, dbData) => {
                        if (err || !dbData) {
                            cb(null, {
                                "code": util.statusCode.FOUR_ZERO_ZERO,
                                "message": util.statusMessage.DB_ERROR
                            });
                            return;
                        }
                        let criteria = {
                            user_id: dbData.insertId
                        }
                        userDAO.getUsers(criteria, (err, dbData) => {
                            let resultantArr = {
                                "user_id": dbData[0].user_id,
                                "user_name": dbData[0].user_name ? (dbData[0].user_name).toString() : '',
                                "email": dbData[0].email ? (dbData[0].email).toString() : '',
                                "country_code": dbData[0].country_code ? dbData[0].country_code.toString() : '',
                                "phone": dbData[0].phone ? (dbData[0].phone).toString() : '',
                                "image": dbData[0].image ? dbData[0].image : '',
                                "profile_status": "0"
                            }
                            let token = jwt.sign({
                                user_id: dbData[0].user_id
                            }, util.secret);
                            resultantArr.acesstoken = token;

                            let str = data.phone.toString();
                            let message = util.statusMessage.LOGIN_SUCCESS + " XXXX" + str.slice(str.length - 4, str.length);
                            cb(null, {
                                "code": util.statusCode.OK,
                                "message": message,
                                result: resultantArr
                            });

                            //Update AccessToken
                            dbConfig.getDB().query(`update users set access_token = ? where user_id = ?`, [token, resultantArr.user_id], (err, dbData) => {
                                return
                            })
                            return;
                        })
                    })
                } else {
                    cb(null, {
                        "code": util.statusCode.FOUR_ZERO_ZERO,
                        "message": util.statusMessage.DB_ERROR
                    });
                    return;
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}


let verifyOTP = (data, token, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            jwt.verify(token, util.secret, function (err, decoded) {
                if (err) {
                    cb(null, {
                        "code": util.statusCode.TWO_ZERO_FOUR,
                        "message": util.statusMessage.USER_NOT_EXITS
                    });
                    return;
                } else {
                    if (!data.otp || !data.type) {
                        cb(null, {
                            "code": util.statusCode.BAD_REQUEST,
                            "message": util.statusMessage.PARAMS_MISSING
                        })
                        return;
                    }
                    let criteria = {
                        user_id: decoded.user_id
                    }
                    userDAO.getUsers(criteria, (err, dbData) => {
                        if (err) {
                            cb(null, {
                                "code": util.statusCode.FOUR_ZERO_ZERO,
                                "message": util.statusMessage.DB_ERROR
                            });
                            return;
                        } else if (dbData && dbData.length) {
                            let db_otp = "1234";

                            if (db_otp == data.otp) {
                                let resultantArr = {
                                    "user_id": dbData[0].user_id,
                                    "user_name": dbData[0].user_name ? (dbData[0].user_name).toString() : '',
                                    "email": dbData[0].email ? (dbData[0].email).toString() : '',
                                    "country_code": dbData[0].country_code ? dbData[0].country_code.toString() : '',
                                    "phone": dbData[0].phone ? (dbData[0].phone).toString() : '',
                                    "image": dbData[0].image ? dbData[0].image : '',
                                    "language": dbData[0].language ? dbData[0].language : '',
                                    "latitude": dbData[0].latitude ? dbData[0].latitude : '',
                                    "longitude": dbData[0].longitude ? dbData[0].longitude : '',
                                    "location": dbData[0].location ? dbData[0].location : '',
                                    "dob": dbData[0].dob ? (dbData[0].dob).toString() : '',
                                    "access_token": dbData[0].access_token ? dbData[0].access_token : ''
                                }
                                resultantArr.profile_status = resultantArr.email != "" ? "1" : "0";

                                cb(null, {
                                    "code": util.statusCode.OK,
                                    "message": util.statusMessage.SUCCESS,
                                    result: resultantArr
                                });
                            } else {
                                cb(null, {
                                    "code": util.statusCode.FOUR_ZERO_ZERO,
                                    "message": util.statusMessage.INVALID_OTP
                                });
                                return;
                            }
                        } else {
                            cb(null, {
                                "code": util.statusCode.FOUR_ZERO_ZERO,
                                "message": util.statusMessage.INVALID_OTP
                            });
                            return;
                        }
                    });
                }
            })
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}

let verifyOTPWebsite = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {

            if (!data.otp || !data.type) {
                cb(null, {
                    "code": util.statusCode.BAD_REQUEST,
                    "message": util.statusMessage.PARAMS_MISSING
                })
                return;
            }
            let criteria = {
                user_id: data.user_id
            }
            userDAO.getUsers(criteria, (err, dbData) => {
                if (err) {
                    cb(null, {
                        "code": util.statusCode.FOUR_ZERO_ZERO,
                        "message": util.statusMessage.DB_ERROR
                    });
                    return;
                } else if (dbData && dbData.length) {
                    let db_otp = "1234";

                    if (db_otp == data.otp) {
                        let resultantArr = {
                            "user_id": dbData[0].user_id,
                            "user_name": dbData[0].user_name ? (dbData[0].user_name).toString() : '',
                            "email": dbData[0].email ? (dbData[0].email).toString() : '',
                            "country_code": dbData[0].country_code ? dbData[0].country_code.toString() : '',
                            "phone": dbData[0].phone ? (dbData[0].phone).toString() : '',
                            "image": dbData[0].image ? dbData[0].image : '',
                            "language": dbData[0].language ? dbData[0].language : '',
                            "latitude": dbData[0].latitude ? dbData[0].latitude : '',
                            "longitude": dbData[0].longitude ? dbData[0].longitude : '',
                            "location": dbData[0].location ? dbData[0].location : '',
                            "dob": dbData[0].dob ? (dbData[0].dob).toString() : '',
                            "access_token": dbData[0].access_token ? dbData[0].access_token : ''
                        }
                        resultantArr.profile_status = resultantArr.email != "" ? "1" : "0";

                        cb(null, {
                            "code": util.statusCode.OK,
                            "message": util.statusMessage.SUCCESS,
                            result: resultantArr
                        });
                    } else {
                        cb(null, {
                            "code": util.statusCode.FOUR_ZERO_ZERO,
                            "message": util.statusMessage.INVALID_OTP
                        });
                        return;
                    }
                } else {
                    cb(null, {
                        "code": util.statusCode.FOUR_ZERO_ZERO,
                        "message": util.statusMessage.INVALID_OTP
                    });
                    return;
                }
            });

        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}

let addProfile = (data, token, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            jwt.verify(token, util.secret, async function (err, decoded) {
                if (err) {
                    cb(null, {
                        "code": util.statusCode.TWO_ZERO_FOUR,
                        "message": util.statusMessage.USER_NOT_EXITS
                    });
                    return;
                } else {

                    ///////////////////////////////////
                    async function checkEmail(data_in) {
                        return new Promise((resolve, reject) => {
                            let ids = data_in.split(',');
                            dbConfig.getDB().query(`select * from users where AES_DECRYPT(email,'${config.key}') = ?`, [data_in], (err3, dbData3) => {
                                if (dbData3 && dbData3.length > 0) {
                                    resolve(true)
                                } else {
                                    resolve(false)
                                }
                            })
                        })
                    }
                    ///////////////////////////////////
                    //Check Email Existance in Database
                    let email_exists = false;
                    if (data.email && data.email != "") {
                        email_exists = await checkEmail(data.email);
                    }

                    if (email_exists) {
                        cb(null, {
                            "code": util.statusCode.FOUR_ZERO_ZERO,
                            "message": "Email Already Exits",
                        });
                    }
                    let criteria = {};
                    if (data.dob && data.dob != "") criteria.dob = data.dob;
                    if (data.user_name && data.user_name != "") criteria.user_name = data.user_name;
                    if (data.email && data.email != "") criteria.email = data.email;
                    if (data.gender && data.gender != "") criteria.gender = data.gender;

                    //User Info
                    if (data.language && data.language != "") criteria.language = data.language;
                    if (data.latitude && data.latitude != "") criteria.latitude = data.latitude;
                    if (data.longitude && data.longitude != "") criteria.longitude = data.longitude;
                    if (data.location && data.location != "") criteria.location = data.location;


                    userDAO.editProfile(criteria, decoded.user_id, (err, dbData) => {
                        if (err) {
                            cb(null, {
                                "code": util.statusCode.FOUR_ZERO_ZERO,
                                "message": util.statusMessage.DB_ERROR
                            });
                            return;
                        }
                        userDAO.getUsers({
                            user_id: decoded.user_id
                        }, (err, dbData) => {
                            let resultantArr = {
                                "user_id": dbData[0].user_id,
                                "user_name": dbData[0].user_name ? (dbData[0].user_name).toString() : '',
                                "email": dbData[0].email ? (dbData[0].email).toString() : '',
                                "country_code": dbData[0].country_code ? dbData[0].country_code.toString() : '',
                                "phone": dbData[0].phone ? (dbData[0].phone).toString() : '',
                                "image": dbData[0].image ? dbData[0].image : '',
                                "profile_status": dbData[0].email != "" ? "1" : "0",
                                "language": dbData[0].language ? dbData[0].language : '',
                                "latitude": dbData[0].latitude ? dbData[0].latitude : '',
                                "longitude": dbData[0].longitude ? dbData[0].longitude : '',
                                "location": dbData[0].location ? dbData[0].location : '',
                                "dob": dbData[0].dob ? (dbData[0].dob).toString() : '',
                                "acesstoken": dbData[0].access_token ? dbData[0].access_token : '',
                            }
                            cb(null, {
                                "code": util.statusCode.OK,
                                "message": util.statusMessage.SUCCESS,
                                result: resultantArr
                            });
                            return;
                        })
                    });
                }
            })
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}

let homeScreen = (data, token, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            jwt.verify(token, util.secret, function (err, decoded) {
                if (err) {
                    cb(null, {
                        "code": util.statusCode.TWO_ZERO_FOUR,
                        "message": util.statusMessage.USER_NOT_EXITS
                    });
                    return;
                } else {
                    async.parallel({
                        banner: (cb) => {
                            dbConfig.getDB().query(`SELECT * FROM banner_management where end_date >= CURRENT_DATE() and status = '1'`, (err, dbData) => {
                                if (err || !dbData) {
                                    cb(null, [])
                                } else if (dbData && dbData.length > 0) {
                                    cb(null, dbData)
                                } else {
                                    cb(null, [])
                                }
                            })
                        },
                        feature_category: (cb) => {
                            dbConfig.getDB().query(`SELECT category_id,category_name,category_source,category_type,range_start,range_end,courses_limit FROM featured_category where status = "1" order by priority asc`, (err, dbData) => {
                                if (err || !dbData) {
                                    cb(null, [])
                                } else if (dbData && dbData.length > 0) {
                                    cb(null, dbData)
                                } else {
                                    cb(null, [])
                                }
                            })
                        },
                    }, async (err, response) => {

                        //////////////////////////////////
                        async function courseIds(data_in) {
                            return new Promise((resolve, reject) => {
                                dbConfig.getDB().query(`SELECT GROUP_CONCAT(course_id) as course_ids FROM featured_category_courses where category_id = ?`, [data_in.category_id], (err3, dbData3) => {
                                    if (dbData3 && dbData3.length > 0) {
                                        resolve(dbData3[0].course_ids)
                                    } else {
                                        resolve('')
                                    }
                                })
                            })
                        }

                        async function courseDetails(data_in) {
                            return new Promise((resolve, reject) => {
                                let ids = data_in.course_ids.split(',');
                                let cat_id = data_in.category_id;

                                let query;
                                if (data_in.category_type == 'user_defined') {
                                    query = `SELECT *,'3' as rating,'1' is_like,(select position from featured_category_courses as fcc where fcc.course_id = c.course_id and fcc.category_id = ${cat_id}) as position FROM courses as c where c.course_id in (${ids}) and c.status = 'published' order by position asc limit 15`;
                                }
                                else {
                                    let limit = data_in.courses_list && data_in.courses_list != "" ? parseInt(data_in.courses_list) : 15;
                                    query = `SELECT *,'3' as rating,'1' is_like,(select position from featured_category_courses as fcc where fcc.course_id = c.course_id and fcc.category_id = ${cat_id}) as position FROM courses as c where c.course_id in (${ids}) and c.status = 'published' order by updated_at desc limit ${limit}`;
                                }

                                dbConfig.getDB().query(query, [data_in], (err3, dbData3) => {
                                    if (dbData3 && dbData3.length > 0) {
                                        resolve(dbData3)
                                    } else {
                                        resolve([])
                                    }
                                })
                            })
                        }
                        //////////////////////////////////
                        for (let i = 0; response.feature_category.length > i; i++) {

                            await courseIds(response.feature_category[i]).then(res => {
                                response.feature_category[i].course_ids = res
                            }).catch(err => {
                                response.feature_category[i].course_ids = "0"
                            });

                            await courseDetails(response.feature_category[i]).then(res => {
                                response.feature_category[i].feature_details = res
                            }).catch(err => {
                                response.feature_category[i].feature_details = []
                            });

                            delete response.feature_category[i].course_ids;

                        }
                        cb(null, {
                            "code": util.statusCode.OK,
                            "message": util.statusMessage.SUCCESS,
                            "result": response
                        });
                        return;
                    })
                }
            })
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}


let courseDetails = (data, token, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            jwt.verify(token, util.secret, function (err, decoded) {
                if (err) {
                    cb(null, {
                        "code": util.statusCode.TWO_ZERO_FOUR,
                        "message": util.statusMessage.USER_NOT_EXITS
                    });
                    return;
                } else {
                    if (!data.course_id) {
                        cb(null, {
                            "code": util.statusCode.BAD_REQUEST,
                            "message": util.statusMessage.PARAMS_MISSING
                        })
                        return;
                    }
                    let course_id = data.course_id;
                    let user_id = decoded.user_id ? decoded.user_id : 0;
                    async.parallel({
                        course_details: (cb) => {
                            dbConfig.getDB().query(`SELECT *,'3' as rating,'1' is_like FROM courses where course_id = ?`, course_id, (err, dbData) => {
                                if (err || !dbData) {
                                    cb(null, {})
                                } else if (dbData && dbData.length > 0) {

                                    dbData[0].what_you_learn = dbData[0].what_you_learn.split('||');
                                    cb(null, dbData[0])
                                } else {
                                    cb(null, {})
                                }
                            })
                        },
                        course_sections: (cb) => {
                            dbConfig.getDB().query(`SELECT section_id,section_title FROM courses_section where course_id = 1`, course_id, (err, dbData) => {
                                if (err || !dbData) {
                                    cb(null, [])
                                } else if (dbData && dbData.length > 0) {
                                    cb(null, dbData)
                                } else {
                                    cb(null, [])
                                }
                            })
                        },
                        purchase_status: (cb) => {
                            dbConfig.getDB().query(`SELECT * FROM users_stuffs where user_id = ? and course_id = ?`, [user_id, course_id], (err, dbData) => {
                                if (err || !dbData) {
                                    cb(null, false)
                                } else if (dbData && dbData.length > 0) {
                                    cb(null, true)
                                } else {
                                    cb(null, false)
                                }
                            })
                        }
                    }, async (err, response) => {

                        //////////////////////////////////
                        async function similerCourses(data_in) {
                            return new Promise((resolve, reject) => {
                                let ids = data_in.similer_courses.split(',');
                                dbConfig.getDB().query(`SELECT *,'3' as rating,'1' is_like FROM courses where course_id in (${ids})`, ids, (err3, dbData3) => {
                                    if (dbData3 && dbData3.length > 0) {
                                        resolve(dbData3)
                                    } else {
                                        resolve([])
                                    }
                                })
                            })
                        }

                        async function sectionChapters(data_in) {
                            return new Promise((resolve, reject) => {
                                dbConfig.getDB().query(`SELECT chapter_id,section_id,chapter_title,content_file,content_type,thumbnail,subtitle_file FROM courses_section_chapter where section_id = ?`, data_in.section_id, (err3, dbData3) => {
                                    if (dbData3 && dbData3.length > 0) {
                                        resolve(dbData3)
                                    } else {
                                        resolve([])
                                    }
                                })
                            })
                        }
                        //////////////////////////////////
                        await similerCourses(response.course_details).then(res => {
                            response.course_details.similer_courses = res
                        }).catch(err => {
                            response.course_details.similer_courses = []
                        });
                        let chapter_count = 0;
                        for (let i = 0; response.course_sections.length > i; i++) {
                            await sectionChapters(response.course_sections[i]).then(res => {
                                response.course_sections[i].section_chapters = res
                                chapter_count = chapter_count + res.length;
                            }).catch(err => {
                                response.course_sections[i].section_chapters = []
                            });
                        }

                        //Add Counts of Sections
                        response.curriculams = {
                            total_sections: response.course_sections.length,
                            total_chapters: chapter_count,
                            total_time_in_seconds: 20000
                        }

                        //Is Buy Status for Course accourding to user
                        response.course_details.is_Buy = response.purchase_status;
                        delete response['purchase_status'];

                        cb(null, {
                            "code": util.statusCode.OK,
                            "message": util.statusMessage.SUCCESS,
                            "result": response
                        });
                        return;
                    })
                }
            })
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}

let logout = (token, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            jwt.verify(token, util.secret, function (err, decoded) {
                if (err) {
                    cb(null, { "code": util.statusCode.TWO_ZERO_FOUR, "message": util.statusMessage.USER_NOT_EXITS }); return;
                }
                let criteria = {
                    user_id: decoded.user_id
                }
                dbConfig.getDB().query(`update users set access_token = '',updated_at = ? where user_id = ?`, [new Date(), criteria.user_id], (err, dbData) => {
                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                    return;
                })
            })
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}

let getTemplate = (data, callback) => {
    async.auto({
        updateStatusinDB: (cb) => {
            validate(data, ['screen'], function (errors) {
                if (Object.keys(errors).length > 0) {
                    cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING, "errors": errors });
                    return;
                }
                else {
                    dbConfig.getDB().query(`SELECT title,content FROM static_content_manegement where type = ?`, [data.screen], (err, dbData) => {
                        if (err || !dbData || (dbData && dbData.length == 0)) {
                            cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": {} });
                            return;
                        }
                        else if (dbData && dbData.length > 0) {
                            cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": dbData[0] });
                            return;
                        }
                        else {
                            cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": {} });
                            return;
                        }
                    })
                }
            });
        }
    }, (err, response) => {
        callback(response.updateStatusinDB);
    })
}

let addStuff = (data, token, callback) => {
    async.auto({
        updateStatusinDB: (cb) => {
            jwt.verify(token, util.secret, function (err, decoded) {
                if (err) {
                    cb(null, { "code": util.statusCode.TWO_ZERO_FOUR, "message": util.statusMessage.USER_NOT_EXITS }); return;
                }
                validate(data, ['course_id'], function (errors) {
                    if (Object.keys(errors).length > 0) {
                        cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING, "errors": errors });
                        return;
                    }
                    else {
                        let criteria = {
                            user_id: decoded.user_id,
                            course_id: data.course_id,
                            stuff_type: 'purchase',
                            added_date: new Date()
                        }
                        userDAO.addStuff(criteria, (err, dbData) => {
                            if (err || !dbData) {
                                cb(null, {
                                    "code": util.statusCode.FOUR_ZERO_ZERO,
                                    "message": util.statusMessage.DB_ERROR
                                });
                                return;
                            }
                            else if (dbData) {
                                cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                                return;
                            }
                            else {
                                cb(null, {
                                    "code": util.statusCode.FOUR_ZERO_ZERO,
                                    "message": util.statusMessage.DB_ERROR
                                });
                                return;
                            }
                        })
                    }
                });
            })
        }
    }, (err, response) => {
        callback(response.updateStatusinDB);
    })
}

let stuffs = (data, token, callback) => {
    async.auto({
        updateStatusinDB: (cb) => {
            jwt.verify(token, util.secret, function (err, decoded) {
                if (err) {
                    cb(null, { "code": util.statusCode.TWO_ZERO_FOUR, "message": util.statusMessage.USER_NOT_EXITS }); return;
                }
                let user_id = decoded.user_id;
                dbConfig.getDB().query(`select * from users_stuffs where user_id = ?`, [user_id], async (err, dbData) => {
                    if (err || !dbData || (dbData && dbData.length == 0)) {
                        cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": [] });
                        return;
                    }
                    else if (dbData && dbData.length > 0) {

                        async function courseDetails(data_in) {
                            return new Promise((resolve, reject) => {
                                dbConfig.getDB().query(`SELECT *,'3' as rating,'1' is_like FROM courses where course_id = ?`, [data_in], (err3, dbData3) => {
                                    if (dbData3 && dbData3.length > 0) {
                                        resolve(dbData3[0])
                                    } else {
                                        resolve({})
                                    }
                                })
                            })
                        }

                        for (let i = 0; dbData.length > i; i++) {

                            await courseDetails(dbData[i].course_id).then(res => {
                                dbData[i].course_details = res
                            }).catch(err => {
                                dbData[i].course_details = {}
                            });

                        }

                        cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": dbData });
                        return;
                    }
                    else {
                        cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": [] });
                        return;
                    }
                })
            })
        }
    }, (err, response) => {
        callback(response.updateStatusinDB);
    })
}


let homeScreenNoLogin = (callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {

            async.parallel({
                banner: (cb) => {
                    dbConfig.getDB().query(`SELECT * FROM banner_management where end_date >= CURRENT_DATE()`, (err, dbData) => {
                        if (err || !dbData) {
                            cb(null, [])
                        } else if (dbData && dbData.length > 0) {
                            cb(null, dbData)
                        } else {
                            cb(null, [])
                        }
                    })
                },
                feature_category: (cb) => {
                    dbConfig.getDB().query(`SELECT category_id,category_name,category_source,category_type,range_start,range_end,courses_limit FROM featured_category where status = "1" order by priority asc`, (err, dbData) => {
                        if (err || !dbData) {
                            cb(null, [])
                        } else if (dbData && dbData.length > 0) {
                            cb(null, dbData)
                        } else {
                            cb(null, [])
                        }
                    })
                },
            }, async (err, response) => {

                //////////////////////////////////
                async function courseIds(data_in) {
                    return new Promise((resolve, reject) => {
                        dbConfig.getDB().query(`SELECT GROUP_CONCAT(course_id) as course_ids FROM featured_category_courses where category_id = ?`, [data_in.category_id], (err3, dbData3) => {
                            if (dbData3 && dbData3.length > 0) {
                                resolve(dbData3[0].course_ids)
                            } else {
                                resolve('')
                            }
                        })
                    })
                }

                async function courseDetails(data_in) {
                    return new Promise((resolve, reject) => {
                        let ids = data_in.course_ids.split(',');
                        let cat_id = data_in.category_id;

                        let query;
                        if (data_in.category_type == 'user_defined') {
                            query = `SELECT *,'3' as rating,'1' is_like,(select position from featured_category_courses as fcc where fcc.course_id = c.course_id and fcc.category_id = ${cat_id}) as position FROM courses as c where c.course_id in (${ids}) and c.status = 'published' order by position asc limit 15`;
                        }
                        else {
                            let limit = data_in.courses_limit && data_in.courses_limit != 0 ? parseInt(data_in.courses_limit) : 15;
                            query = `SELECT *,'3' as rating,'1' is_like,(select position from featured_category_courses as fcc where fcc.course_id = c.course_id and fcc.category_id = ${cat_id}) as position FROM courses as c where c.course_id in (${ids}) and c.status = 'published' and DATE_FORMAT((updated_at),'%Y-%m-%d') between '${data_in.range_start}' and '${data_in.range_end}' order by updated_at desc limit ${limit}`;
                        }
                        dbConfig.getDB().query(query, [data_in], (err3, dbData3) => {
                            if (dbData3 && dbData3.length > 0) {
                                resolve(dbData3)
                            } else {
                                resolve([])
                            }
                        })
                    })
                }
                //////////////////////////////////
                for (let i = 0; response.feature_category.length > i; i++) {

                    await courseIds(response.feature_category[i]).then(res => {
                        response.feature_category[i].course_ids = res
                    }).catch(err => {
                        response.feature_category[i].course_ids = "0"
                    });

                    await courseDetails(response.feature_category[i]).then(res => {
                        response.feature_category[i].feature_details = res
                    }).catch(err => {
                        response.feature_category[i].feature_details = []
                    });

                    delete response.feature_category[i].course_ids;

                }
                cb(null, {
                    "code": util.statusCode.OK,
                    "message": util.statusMessage.SUCCESS,
                    "result": response
                });
                return;
            })

        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}


let courseDetailsNoLogin = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.course_id) {
                cb(null, {
                    "code": util.statusCode.BAD_REQUEST,
                    "message": util.statusMessage.PARAMS_MISSING
                })
                return;
            }
            let course_id = data.course_id;
            async.parallel({
                course_details: (cb) => {
                    dbConfig.getDB().query(`SELECT *,'3' as rating,'1' is_like FROM courses where course_id = ?`, course_id, (err, dbData) => {
                        if (err || !dbData) {
                            cb(null, {})
                        } else if (dbData && dbData.length > 0) {

                            dbData[0].what_you_learn = dbData[0].what_you_learn.split('||');
                            cb(null, dbData[0])
                        } else {
                            cb(null, {})
                        }
                    })
                },
                course_sections: (cb) => {
                    dbConfig.getDB().query(`SELECT section_id,section_title FROM courses_section where course_id = 1`, course_id, (err, dbData) => {
                        if (err || !dbData) {
                            cb(null, [])
                        } else if (dbData && dbData.length > 0) {
                            cb(null, dbData)
                        } else {
                            cb(null, [])
                        }
                    })
                },
                purchase_status: (cb) => {
                    cb(null, false)
                }
            }, async (err, response) => {

                //////////////////////////////////
                async function similerCourses(data_in) {
                    return new Promise((resolve, reject) => {
                        let ids = data_in.similer_courses.split(',');
                        dbConfig.getDB().query(`SELECT *,'3' as rating,'1' is_like FROM courses where course_id in (${ids})`, ids, (err3, dbData3) => {
                            if (dbData3 && dbData3.length > 0) {
                                resolve(dbData3)
                            } else {
                                resolve([])
                            }
                        })
                    })
                }

                async function sectionChapters(data_in) {
                    return new Promise((resolve, reject) => {
                        dbConfig.getDB().query(`SELECT chapter_id,section_id,chapter_title,content_file,content_type,thumbnail,subtitle_file FROM courses_section_chapter where section_id = ?`, data_in.section_id, (err3, dbData3) => {
                            if (dbData3 && dbData3.length > 0) {
                                resolve(dbData3)
                            } else {
                                resolve([])
                            }
                        })
                    })
                }
                //////////////////////////////////
                await similerCourses(response.course_details).then(res => {
                    response.course_details.similer_courses = res
                }).catch(err => {
                    response.course_details.similer_courses = []
                });
                let chapter_count = 0;
                for (let i = 0; response.course_sections.length > i; i++) {
                    await sectionChapters(response.course_sections[i]).then(res => {
                        response.course_sections[i].section_chapters = res
                        chapter_count = chapter_count + res.length;
                    }).catch(err => {
                        response.course_sections[i].section_chapters = []
                    });
                }

                //Add Counts of Sections
                response.curriculams = {
                    total_sections: response.course_sections.length,
                    total_chapters: chapter_count,
                    total_time_in_seconds: 20000
                }

                //Is Buy Status for Course accourding to user
                response.course_details.is_Buy = response.purchase_status;
                delete response['purchase_status'];
                cb(null, {
                    "code": util.statusCode.OK,
                    "message": util.statusMessage.SUCCESS,
                    "result": response
                });
                return;
            })

        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}

let categoryDetails = (data, token, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            jwt.verify(token, util.secret, function (err, decoded) {
                if (err) {
                    cb(null, {
                        "code": util.statusCode.TWO_ZERO_FOUR,
                        "message": util.statusMessage.USER_NOT_EXITS
                    });
                    return;
                } else {

                    dbConfig.getDB().query(`SELECT GROUP_CONCAT(course_id) as course_ids FROM featured_category_courses where category_id = ?`, [data.category_id], async (err, dbData) => {
                        if (err || !dbData) {
                            cb(null, {
                                "code": util.statusCode.OK,
                                "message": util.statusMessage.SUCCESS,
                                "result": []
                            });
                            return;
                        }
                        else if (dbData && dbData.length > 0 && dbData[0].course_ids != "") {

                            async function courseDetails(data_in) {
                                return new Promise((resolve, reject) => {
                                    let ids = data_in.split(',');
                                    dbConfig.getDB().query(`SELECT *,'3' as rating,'1' is_like FROM courses where course_id in (${ids}) and status = 'published'`, [data_in], (err3, dbData3) => {
                                        if (dbData3 && dbData3.length > 0) {
                                            resolve(dbData3)
                                        } else {
                                            resolve([])
                                        }
                                    })
                                })
                            }
                            let result = [];
                            await courseDetails(dbData[0].course_ids).then(res => {
                                result = res
                            }).catch(err => {
                                result = []
                            });


                            cb(null, {
                                "code": util.statusCode.OK,
                                "message": util.statusMessage.SUCCESS,
                                "result": result
                            });
                            return;
                        }
                        else {
                            cb(null, {
                                "code": util.statusCode.OK,
                                "message": util.statusMessage.SUCCESS,
                                "result": []
                            });
                            return;
                        }
                    })
                    //////////////////////////////////

                    // //////////////////////////////////
                    // for (let i = 0; response.feature_category.length > i; i++) {
                    //     await courseDetails(response.feature_category[i].course_ids).then(res => {
                    //         response.feature_category[i].feature_details = res
                    //     }).catch(err => {
                    //         response.feature_category[i].feature_details = []
                    //     });

                    //     delete response.feature_category[i].course_ids;

                    // }

                }
            })
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}
module.exports = {
    /* Without Login */
    homeScreenNoLogin: homeScreenNoLogin,
    courseDetailsNoLogin, courseDetailsNoLogin,

    signIn: signIn,
    verifyOTP: verifyOTP,
    verifyOTPWebsite: verifyOTPWebsite,
    addProfile: addProfile,
    homeScreen: homeScreen,
    courseDetails: courseDetails,
    logout: logout,
    getTemplate: getTemplate,
    addStuff: addStuff,
    stuffs: stuffs,
    categoryDetails: categoryDetails
}



function validate(requestData, requiredFields, callback) {
    let validateErros = {};
    if (requiredFields.length > 0) {
        requiredFields.forEach(function (item, index) {
            if (typeof requestData[item] === 'undefined' || requestData[item] == '') {
                validateErros[item] = 'Field cannot be empty.';
            }
        });
    }
    callback(validateErros);
}