const { decode } = require('punycode');

let async = require('async'),
    util = require('../../Utilities/util'),
    adminDAO = require('../../DAO/adminDAO'),
    userDAO = require('../../DAO/userDAOEncrypt'),
    jwt = require('jsonwebtoken'),
    config = require('../../Utilities/config'),
    Cryptr = require('cryptr'),
    cryptr = new Cryptr(process.env.main_key),
    multiparty = require('multiparty'),
    fs = require('fs'),
    dbConfig = require("../../Utilities/dbConfig"),
    configs = require('../../Utilities/config').config,
    moment = require('moment'),
    notify = require("../../Utilities/commonFunction");


let adminLogin = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            validate(data, ['email', 'password'], function (errors) {
                if (Object.keys(errors).length > 0) {
                    cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING, "errors": errors });
                    return;
                }
                else {
                    let criteria = {
                        email: data.email,
                    }
                    adminDAO.adminUsers(criteria, (err, dbData) => {
                        if (err) {
                            cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PASSWORD_NOT_VALID });
                            return;
                        }
                        else if (dbData && dbData.length) {

                            if (dbData[0].password != '' && cryptr.decrypt(dbData[0].password) != data.password) {
                                cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PASSWORD_NOT_VALID });
                                return;
                            }
                            else {
                                let resultantArr = {
                                    "admin_id": dbData[0].admin_id,
                                    "name": dbData[0].name ? dbData[0].name : '',
                                    "email": dbData[0].email ? dbData[0].email : '',
                                    "image": dbData[0].image ? dbData[0].image : ''
                                }
                                let token = jwt.sign({ admin_id: dbData[0].admin_id }, util.secret, {
                                    expiresIn: '6h' // expires in 6 hour
                                });
                                resultantArr.token = token;
                                cb(null, {
                                    "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, result: resultantArr
                                });
                                return;
                            }
                        }
                        else {
                            cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PASSWORD_NOT_VALID });
                            return;
                        }
                    });
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}

let resetPassword = (data, callback) => {
    async.auto({
        updateStatusinDB: (cb) => {
            validate(data, ['password'], function (errors) {
                if (Object.keys(errors).length > 0) {
                    cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING, "errors": errors });
                    return;
                }
                else {
                    jwt.verify(data.token, util.secret, function (err, decoded) {
                        if (err) {
                            cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                            return
                        }
                        let criteria = {
                            admin_id: decoded.admin_id
                        }
                        let password = util.generatePassword(data.password);
                        dbConfig.getDB().query(`update admin_details set password = ? where admin_id = ?`, [password, criteria.admin_id], (err_change, dbData_change) => {
                            if (err_change || !dbData_change) {
                                cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERROR });
                                return;
                            }
                            else {
                                cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.PASSWORD_CHNAGED });
                                return;
                            }
                        })
                    })
                }
            })
        }
    }, (err, response) => {
        callback(response.updateStatusinDB);
    })
}

let forgotPassword = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.email) {
                cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING })
                return;
            }
            dbConfig.getDB().query(`select * from admin_details where email = ?`, [data.email], (err, dbData) => {
                if (err || !dbData || dbData.length == 0) {
                    cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.ADMIN_EMAIL_ERROR });
                    return;
                }
                let forgot_token = jwt.sign({ admin_id: dbData[0].admin_id }, util.secret, {
                    expiresIn: 1800 // expires in 30 minutes
                });

                let criteria = {
                    email: data.email,
                    subject: "findemy: Reset your Password",
                    data: "Thank You for being the part of findemy.",
                    url: config.config.webURL,
                }

                criteria.link = config.config.webURL + "resetPassword?email=" + criteria.email + "&token=" + forgot_token;

                console.log(criteria.link)
                util.forgotPasswordAdmin(criteria, (err1, sendEmail) => {
                    console.log(err1, sendEmail)
                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.EMAIL_SENT });
                    return;
                })
            })
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}


let tokenVerify = (token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.FIVE_ZERO_ZERO });
                    return
                }
                else {
                    cb(null, { "code": util.statusCode.OK });
                    return;
                }
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

let editProfile = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            let form = new multiparty.Form({ autoFiles: true });
            form.parse(data, function (err, fields, files) {
                jwt.verify(token, util.secret, (err, decoded) => {
                    if (err) {
                        cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                        return;
                    }
                    let dataToSet = {
                        admin_id: decoded.admin_id,
                        name: fields.name,
                        email: fields.email,
                    };
                    if (files.file) {
                        util.image_upload(files, (err12, result12) => {
                            dataToSet.image = result12.length > 0 ? result12[0] : '';
                            adminDAO.updateAdmin(dataToSet, async (err, dbData) => {
                                if (err) {
                                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.DB_ERROR });
                                    return;
                                }
                                let admin_data = await getAdminData(dataToSet.admin_id);
                                admin_data.token = jwt.sign({ admin_id: admin_data.admin_id }, util.secret);

                                cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": admin_data });
                                return;
                            })
                        })
                    }
                    else {
                        adminDAO.updateAdmin(dataToSet, async (err, dbData) => {
                            if (err) {
                                cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.DB_ERROR });
                                return;
                            }
                            let admin_data = await getAdminData(dataToSet.admin_id);
                            admin_data.token = jwt.sign({ admin_id: admin_data.admin_id }, util.secret);
                            cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": admin_data });
                            return;
                        })
                    }
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

let userLists = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }
                adminDAO.allUserList(data, (err, dbData) => {
                    if (err || !dbData) {
                        cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": [] });
                        return;
                    }
                    else if (dbData && dbData.length > 0) {
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
        callback(response.checkEventExistsinDB);
    })
}



let userDetail = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }

                let user_id = data.user_id;
                cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": [] });
                return;
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

let featureCategoryList = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }

                let conditions = ` where 1 and status != '2'`;
                data.search && data.search != '' ? conditions += `  and fc.category_name like '%${data.search}%' ` : true;

                // conditions += ` updated_at = ${new Date()}`

                dbConfig.getDB().query(`SELECT fc.category_id,fc.admin_id,fc.category_name,UPPER(fc.category_source) as category_source,UPPER(fc.category_type) as category_type,fc.status,(select count(*) from featured_category_courses as cc where cc.category_id = fc.category_id) as courses,(select GROUP_CONCAT(cc.course_id) from featured_category_courses as cc where cc.category_id = fc.category_id) as courses_ids,fc.priority,fc.range_start,fc.range_end,fc.courses_limit FROM featured_category as fc ${conditions} order by priority asc`, async (err, dbData) => {

                    if (err || !dbData) {
                        cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": [] });
                        return;
                    }
                    else if (dbData && dbData.length > 0) {

                        /////////////////////////////////////////
                        async function categoryCourses(data_in) {
                            return new Promise((resolve, reject) => {
                                let ids = data_in.courses_ids.split(',');
                                let cat_id = data_in.category_id;
                                dbConfig.getDB().query(`SELECT c.course_name,c.course_id,(select position from featured_category_courses as fcc where fcc.course_id = c.course_id and fcc.category_id = ${cat_id}) as position FROM courses as c where c.course_id in(${ids}) order by position`, (err3, dbData3) => {
                                    if (dbData3 && dbData3.length > 0) {
                                        resolve(dbData3)
                                    } else {
                                        resolve([])
                                    }
                                })
                            })
                        }
                        ////////////////////////////////////////

                        for (let i = 0; dbData.length > i; i++) {

                            await categoryCourses(dbData[i]).then(res => {
                                dbData[i].course_details = res
                            }).catch(err => {
                                dbData[i].course_details = []
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
        callback(response.checkEventExistsinDB);
    })
}

let actionUser = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }
                dbConfig.getDB().query(`update users set status = ? where user_id = ?`, [data.status, data.user_id], (err, dbData) => {
                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                    return;
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

let courseLists = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }
                let conditions = ' where 1 ';
                data.search && data.search != '' ? conditions += `  and c.course_name like '%${data.search}%' ` : true;
                
                dbConfig.getDB().query(`select c.*,(select count(*) as count from users_stuffs as us where us.course_id = c.course_id) as purchase_count from courses as c ${conditions}`, (err, dbData) => {
                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": dbData, "data" : data });
                    return;
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

let addFeatureCategory = (data, token, callback) => {
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
                    validate(data, ['course_ids', 'category_name', 'category_source'], function (errors) {
                        if (Object.keys(errors).length > 0) {
                            cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING, "errors": errors });
                            return;
                        }
                        else {

                            async.waterfall([
                                function (pass) {
                                    let query = `SELECT MAX(priority) as max FROM featured_category`;
                                    dbConfig.getDB().query(query, (err, dbData) => {
                                        console.log(err, dbData)
                                        if (err) { pass(null, 0) }
                                        else if (dbData && dbData.length > 0) { pass(null, dbData[0].max) }
                                        else {
                                            pass(null, 0)
                                        }
                                    })
                                },
                                function (args, pass) {

                                    console.log(args)
                                    //Set Priority Condition wise
                                    let obj = {
                                        admin_id: decoded.admin_id,
                                        category_name: data.category_name,
                                        category_source: data.category_source,
                                        category_type: 'user_defined',
                                        priority: parseInt(args) + 1,
                                        created_at: new Date(),
                                        updated_at: new Date()
                                    }
                                    dbConfig.getDB().query(`insert into featured_category set ?`, obj, (err, dbData) => {
                                        if (err || !dbData) {
                                            pass(err, null)
                                        } else if (dbData) {
                                            pass(null, dbData)
                                        } else {
                                            pass(err, null)
                                        }
                                    })
                                },
                                function (arg, pass) {
                                    let p = 1;
                                    data.course_ids.forEach(ele => {
                                        ele.position = p;
                                        ele.category_id = arg.insertId
                                        ele.created_at = new Date()
                                        ele.updated_at = new Date()
                                        delete ele.course_name

                                        p++;
                                    })

                                    let keys = Object.keys(data.course_ids[0]);
                                    let values = data.course_ids.map(obj => keys.map(key => obj[key]));
                                    let query = 'INSERT INTO featured_category_courses ' + ' (' + keys.join(',') + ') VALUES ?';
                                    dbConfig.getDB().query(query, [values], (err, dbData) => {
                                        if (err || !dbData) {
                                            pass(err, null)
                                        } else if (dbData) {
                                            pass(null, dbData)
                                        } else {
                                            pass(err, null)
                                        }
                                    })
                                }
                            ], function (err, result) {
                                if (err) {
                                    cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERROR });
                                    return;
                                }
                                else {
                                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                                    return;
                                }
                            });
                        }
                    })
                }
            })
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}


let editFeatureCategory = (data, token, callback) => {
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
                    validate(data, ['category_id', 'course_ids', 'category_name', 'category_source'], function (errors) {
                        if (Object.keys(errors).length > 0) {
                            cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING, "errors": errors });
                            return;
                        }
                        else {
                            async.waterfall([
                                function (pass) {
                                    let obj = {
                                        admin_id: decoded.admin_id,
                                        category_name: data.category_name,
                                        category_source: data.category_source,
                                        created_at: new Date(),
                                        updated_at: new Date()
                                    }

                                    if (data.courses_limit && data.courses_limit != "") obj.courses_limit = data.courses_limit;
                                    if (data.range_start && data.range_start != "") obj.range_start = data.range_start;
                                    if (data.range_end && data.range_end != "") obj.range_end = data.range_end;

                                    dbConfig.getDB().query(`update featured_category set ? where category_id = ${data.category_id}`, obj, (err, dbData) => {
                                        if (err || !dbData) {
                                            pass(err, null)
                                        } else if (dbData) {
                                            pass(null, dbData)
                                        } else {
                                            pass(err, null)
                                        }
                                    })
                                },
                                function (arg, pass) {
                                    let query = `DELETE FROM featured_category_courses WHERE category_id = ${data.category_id}`
                                    dbConfig.getDB().query(query, (err, dbData) => {
                                        if (err || !dbData) {
                                            pass(err, null)
                                        } else if (dbData) {
                                            pass(null, dbData)
                                        } else {
                                            pass(err, null)
                                        }
                                    })
                                },
                                function (arg, pass) {
                                    let p = 1;
                                    data.course_ids.forEach(ele => {
                                        ele.position = p;
                                        ele.category_id = data.category_id
                                        ele.created_at = new Date()
                                        ele.updated_at = new Date()
                                        delete ele.course_name

                                        p++;
                                    })

                                    let keys = Object.keys(data.course_ids[0]);
                                    let values = data.course_ids.map(obj => keys.map(key => obj[key]));
                                    let query = 'INSERT INTO featured_category_courses ' + ' (' + keys.join(',') + ') VALUES ?';
                                    dbConfig.getDB().query(query, [values], (err, dbData) => {
                                        if (err || !dbData) {
                                            pass(err, null)
                                        } else if (dbData) {
                                            pass(null, dbData)
                                        } else {
                                            pass(err, null)
                                        }
                                    })
                                }
                            ], function (err, result) {
                                if (err) {
                                    cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERROR });
                                    return;
                                }
                                else {
                                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                                    return;
                                }
                            });
                        }
                    })
                }
            })
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    });
}

let actionCategory = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }
                dbConfig.getDB().query(`update featured_category set status = ? where category_id = ?`, [data.status, data.category_id], (err, dbData) => {

                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });

                    //Update Priority When the Category deleted
                    if (data.status == '2' || data.status == 2) {
                        dbConfig.getDB().query(` update featured_category set priority = priority - 1 where priority > ?`, [data.priority], (err, dbData) => {
                            return;
                        })
                    }
                    return;
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

let addCourse = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            let form = new multiparty.Form({ autoFiles: true });
            form.parse(data, function (err, fields, files) {
                if (!fields || !files) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.DB_ERROR });
                    return;
                }
                jwt.verify(token, util.secret, (err, decoded) => {
                    if (err) {
                        cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                        return;
                    }
                    validate(fields, ['course_name'], function (errors) {
                        if (Object.keys(errors).length > 0) {
                            cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING, "errors": errors });
                            return;
                        }
                        else {
                            let dataToSet = {
                                admin_id: decoded.admin_id,
                                course_name: fields.course_name,
                                creator_name: fields.creator_name,
                                label: fields.label,
                                price_subscriber: fields.price_subscriber,
                                price_non_subscriber: fields.price_non_subscriber,
                                language: fields.language,
                                subtitle: fields.subtitle,
                                purchase: fields.purchase,
                                duration: '30000',
                                course_validity_time: fields.course_validity_time,
                                course_validity_type: fields.course_validity_type,
                                course_preview_type: fields.course_preview_type,
                                summary: fields.summary,
                                what_you_learn: fields.what_you_learn,
                                description: fields.description,
                                about: fields.about,
                                created_at: new Date(),
                                updated_at: new Date()
                            };
                            if (fields.similer_courses && fields.similer_courses != "") {
                                dataToSet.similer_courses = fields.similer_courses
                            }
                            util.image_upload(files, (err12, result12) => {
                                console.log(err12, result12)
                                dataToSet.course_preview = result12.length > 0 ? result12[0] : '';
                                dataToSet.preview_thumbnail = result12.length > 0 ? result12[1] : '';
                                adminDAO.addCourse(dataToSet, (err, dbData) => {
                                    console.log(err, dbData)
                                    if (err) {
                                        cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.DB_ERROR });
                                        return;
                                    }
                                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });

                                    //Saved To New Addtions to this Course
                                    if (dbData.insertId) {
                                        let obj = {
                                            category_id: 1,
                                            course_id: dbData.insertId,
                                            created_at: new Date(),
                                            updated_at: new Date()
                                        }
                                        dbConfig.getDB().query("insert into featured_category_courses set ? ", obj, (er, db) => {
                                            return;
                                        });
                                    }
                                    return;
                                })
                            })
                        }
                    })
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}


let editCourse = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            let form = new multiparty.Form({ autoFiles: true });
            form.parse(data, function (err, fields, files) {
                jwt.verify(token, util.secret, (err, decoded) => {
                    if (err) {
                        cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                        return;
                    }
                    validate(fields, ['course_name'], function (errors) {
                        if (Object.keys(errors).length > 0) {
                            cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING, "errors": errors });
                            return;
                        }
                        else {
                            let dataToSet = {
                                admin_id: decoded.admin_id,
                                course_name: fields.course_name,
                                creator_name: fields.creator_name,
                                label: fields.label,
                                price_subscriber: fields.price_subscriber,
                                price_non_subscriber: fields.price_non_subscriber,
                                language: fields.language,
                                subtitle: fields.subtitle,
                                purchase: fields.purchase,
                                course_validity_time: fields.course_validity_time,
                                course_validity_type: fields.course_validity_type,
                                course_preview_type: fields.course_preview_type,
                                summary: fields.summary,
                                what_you_learn: fields.what_you_learn,
                                description: fields.description,
                                about: fields.about,
                                updated_at: new Date()
                            };
                            if (fields.similer_courses && fields.similer_courses != "") {
                                dataToSet.similer_courses = fields.similer_courses
                            }
                            if (files && files.file) {
                                util.image_upload(files, (err12, result12) => {
                                    if (fields.check == '3') {
                                        dataToSet.course_preview = result12.length > 0 ? result12[0] : '';
                                        dataToSet.preview_thumbnail = result12.length > 0 ? result12[1] : '';
                                    }
                                    else if (fields.check == '1') {
                                        dataToSet.course_preview = result12.length > 0 ? result12[0] : '';
                                    }
                                    else if (fields.check == '2') {
                                        dataToSet.preview_thumbnail = result12.length > 0 ? result12[0] : '';
                                    }
                                    else {

                                    }
                                    adminDAO.editCourse(dataToSet, fields.course_id, (err, dbData) => {
                                        if (err) {
                                            cb(null, { "code": util.statusCode.FIVE_ZERO_ZERO, "message": util.statusMessage.DB_ERROR });
                                            return;
                                        }
                                        cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                                    })
                                })
                            }
                            else {
                                console.log(dataToSet)
                                adminDAO.editCourse(dataToSet, fields.course_id, (err, dbData) => {
                                    if (err) {
                                        cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.DB_ERROR });
                                        return;
                                    }
                                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                                })
                            }
                        }
                    })
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
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
                                    cb(null, dbData[0])
                                } else {
                                    cb(null, {})
                                }
                            })
                        },

                    }, (err, response) => {
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

let actionCourses = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }

                dbConfig.getDB().query(`update courses set status = ? where course_id = ?`, [data.status, data.course_id], (err, dbData) => {
                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                    return;
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

let bannerList = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }

                let conditions = ' where 1 ';
                data.search && data.search != '' ? conditions += `  and banner_title like '%${data.search}%' ` : true;
                dbConfig.getDB().query(`SELECT *,DATE_FORMAT((start_date),'%Y-%m-%d') as start_date,DATE_FORMAT((end_date),'%Y-%m-%d') as end_date, ( CASE WHEN end_date < CURRENT_DATE() THEN 'EXPIRED' WHEN CURRENT_DATE() BETWEEN start_date and end_date THEN 'PUBLISHED' ELSE 'SCHEDULED' END) AS message FROM banner_management ${conditions} and status = '1'`, async (err, dbData) => {
                    if (err || !dbData) {
                        cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS, "result": [] });
                        return;
                    }
                    else if (dbData && dbData.length > 0) {


                        /////////////////////////////////////////
                        async function itemDetails(data_in) {
                            return new Promise((resolve, reject) => {

                                if (data_in.item_type == 'courses') {
                                    let ids = data_in.item_id;
                                    dbConfig.getDB().query(`SELECT c.course_name,c.course_id FROM courses as c where c.course_id = ${ids}`, (err3, dbData3) => {
                                        if (dbData3 && dbData3.length > 0) {
                                            resolve(dbData3)
                                        } else {
                                            resolve([])
                                        }
                                    })
                                }
                                else {
                                    resolve([])
                                }
                            })
                        }
                        ////////////////////////////////////////

                        for (let i = 0; dbData.length > i; i++) {
                            await itemDetails(dbData[i]).then(res => {
                                dbData[i].item_details = res
                            }).catch(err => {
                                dbData[i].item_details = []
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
        callback(response.checkEventExistsinDB);
    })
}


let addBanner = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            let form = new multiparty.Form({ autoFiles: true });
            form.parse(data, function (err, fields, files) {
                jwt.verify(token, util.secret, (err, decoded) => {
                    if (err) {
                        cb(null, { "code": util.statusCode.FOUR_ZERO_ZERO, "message": util.statusMessage.INVALID_TOKEN })
                        return;
                    }
                    let req_data = {
                        banner_title: fields ? fields.banner_title : '',
                        text_over_banner: fields ? fields.text_over_banner : '',
                        click_url: fields ? fields.click_url : '',
                        start_date: fields ? fields.start_date : '',
                        end_date: fields ? fields.end_date : '',
                        file: files && files.file ? ['1'] : ['']
                    }
                    validate(req_data, ['start_date', 'end_date', 'file', 'banner_title', 'text_over_banner'], function (errors) {
                        if (Object.keys(errors).length > 0) {
                            cb(null, { "code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.PARAMS_MISSING, "errors": errors });
                            return;
                        }
                        else {
                            let dataToSet = {
                                admin_id: decoded.admin_id,
                                start_date: new Date(fields.start_date),
                                end_date: new Date(fields.end_date),
                                banner_title: fields.banner_title,
                                text_over_banner: fields.text_over_banner,
                                banner_file_type: fields.banner_file_type,
                                item_type: fields.item_type,
                                item_id: fields.item_id,
                                created_at: new Date(),
                                updated_at: new Date()
                            }

                            util.image_upload(files, (err12, result12) => {
                                if (fields.check == '3') {
                                    dataToSet.banner_file = result12.length > 0 ? result12[0] : '';
                                    dataToSet.banner_file_thumbnail = result12.length > 0 ? result12[1] : '';
                                }
                                else if (fields.check == '1') {
                                    dataToSet.banner_file = result12.length > 0 ? result12[0] : '';
                                }
                                else if (fields.check == '2') {
                                    dataToSet.banner_file_thumbnail = result12.length > 0 ? result12[0] : '';
                                }
                                else {
                                    return;
                                }

                                adminDAO.addBanner(dataToSet, (err, dbData) => {
                                    console.log(err, dbData)
                                    if (err) {
                                        cb(null, { "code": util.statusCode.FOUR_ZERO_ZERO, "message": util.statusMessage.DB_ERROR });
                                        return;
                                    }
                                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                                    return;
                                })
                            })
                        }
                    })
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

let editBanner = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            let form = new multiparty.Form({ autoFiles: true });
            form.parse(data, function (err, fields, files) {
                jwt.verify(token, util.secret, (err, decoded) => {
                    if (err) {
                        cb(null, { "code": util.statusCode.FOUR_ZERO_ZERO, "message": util.statusMessage.INVALID_TOKEN })
                        return;
                    }

                    let dataToSet = {
                        admin_id: decoded.admin_id,
                        start_date: new Date(fields.start_date),
                        end_date: new Date(fields.end_date),
                        banner_title: fields.banner_title,
                        text_over_banner: fields.text_over_banner,
                        item_type: fields.item_type,
                        item_id: fields.item_id,
                        updated_at: new Date()
                    }
                    if (files && files.file) {
                        dataToSet.banner_id = fields.banner_id;
                        util.image_upload(files, (err12, result12) => {
                            if (fields.check == '3') {
                                dataToSet.banner_file = result12.length > 0 ? result12[0] : '';
                                dataToSet.banner_file_thumbnail = result12.length > 0 ? result12[1] : '';
                            }
                            else if (fields.check == '1') {
                                dataToSet.banner_file = result12.length > 0 ? result12[0] : '';
                            }
                            else if (fields.check == '2') {
                                dataToSet.banner_file_thumbnail = result12.length > 0 ? result12[0] : '';
                            }
                            else {
                                return;
                            }
                            adminDAO.editBanner(dataToSet, (err, dbData) => {
                                console.log(err, dbData)
                                if (err) {
                                    cb(null, { "code": util.statusCode.FOUR_ZERO_ZERO, "message": util.statusMessage.DB_ERROR });
                                    return;
                                }
                                cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                                return;
                            })
                        })
                    }
                    else {
                        dataToSet.banner_id = fields.banner_id;
                        adminDAO.editBanner(dataToSet, (err, dbData) => {
                            console.log(err, dbData)
                            if (err) {
                                cb(null, { "code": util.statusCode.FOUR_ZERO_ZERO, "message": util.statusMessage.DB_ERROR });
                                return;
                            }
                            cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                            return;
                        })
                    }
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

let actionBanner = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }
                dbConfig.getDB().query(`update banner_management set status = ? where banner_id = ?`, [data.status, data.banner_id], (err, dbData) => {
                    cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                    return;
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}


let changePositionCategory = (data, token, callback) => {
    async.auto({
        checkEventExistsinDB: (cb) => {
            jwt.verify(token, util.secret, (err, decoded) => {
                if (err) {
                    cb(null, { "code": util.statusCode.INTERNAL_SERVER_ERROR, "message": util.statusMessage.INVALID_TOKEN_ADMIN })
                    return
                }
                dbConfig.getDB().query(`update featured_category set priority = ? where category_id = ?`, [data.y_value, data.x_id], (err, dbData) => {
                    dbConfig.getDB().query(`update featured_category set priority = ? where category_id = ?`, [data.x_value, data.y_id], (err, dbData) => {
                        cb(null, { "code": util.statusCode.OK, "message": util.statusMessage.SUCCESS });
                        return;
                    })
                })
            })
        }
    }, (err, response) => {
        callback(response.checkEventExistsinDB);
    })
}

module.exports = {
    adminLogin: adminLogin,
    resetPassword: resetPassword,
    editProfile: editProfile,
    forgotPassword: forgotPassword,

    userLists: userLists,
    userDetail: userDetail,
    actionUser: actionUser,

    tokenVerify: tokenVerify,
    featureCategoryList: featureCategoryList,
    addFeatureCategory: addFeatureCategory,
    editFeatureCategory: editFeatureCategory,
    actionCategory: actionCategory,
    changePositionCategory: changePositionCategory,

    courseLists: courseLists,
    addCourse: addCourse,
    editCourse: editCourse,
    courseDetails: courseDetails,
    actionCourses: actionCourses,

    bannerList: bannerList,
    addBanner: addBanner,
    editBanner: editBanner,
    actionBanner: actionBanner
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getAdminData(data) {
    return new Promise((resolve, reject) => {
        let query = `select * from admin_details where admin_id = ?`
        dbConfig.getDB().query(query, data, (err, dbData) => {
            if (err) { resolve({}) }
            else if (dbData && dbData.length > 0) {
                resolve(dbData[0])
            }
            else {
                resolve({})
            }
        })
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////