'use strict';

const dbConfig = require("../Utilities/dbConfig");
const configs = require("../Utilities/config").config;

let adminUsers = (criteria, callback) => {
    let conditions = "";
    criteria.email ? conditions += `  email = '${criteria.email}'` : true;
    criteria.admin_id ? conditions += `  admin_id = '${criteria.admin_id}'` : true;
    dbConfig.getDB().query(`select * from admin_details where ${conditions}`, (err, dbData) => {
        if (err) { callback(null, []) }
        else if (dbData && dbData.length > 0) { callback(null, dbData) }
        else { callback(null, []) }
    });
}

let updateAdmin = (criteria, callback) => {
    let dataToSet = {};
    criteria.name && criteria.name != '' ? dataToSet.name = criteria.name : true;
    criteria.email && criteria.email != '' ? dataToSet.email = criteria.email : true;
    criteria.image && criteria.image != '' ? dataToSet.image = criteria.image : true;
    dbConfig.getDB().query(`update admin_details set ? where admin_id = '1'`, dataToSet, callback);
}

let allUserList = (criteria, callback) => {
    let conditions = ' where 1 ';
    criteria.search && criteria.search != '' ? conditions += `  and ((AES_DECRYPT(user_name,'${configs.key}') like '%${criteria.search}%') or (AES_DECRYPT(email,'${configs.key}') like '%${criteria.search}%') or (AES_DECRYPT(phone,'${configs.key}') like '%${criteria.search}%')) ` : true;

    if (criteria.trash && criteria.trash == 'true') {
        conditions += ` and status = '2' `;
    }
    else {
        conditions += ` and (status = '0' or status = '1') `;
    }


    let order;

    order = criteria.date === '1' ? ` order by created_at asc` : criteria.date === '-1' ? ` order by created_at desc` : ` order by created_at desc`;

    order = criteria.age === '1' ? ` order by age asc` : criteria.age === '-1' ? ` order by age desc` : ` `;

    let query = `select user_id,AES_DECRYPT(user_name,'${configs.key}') as user_name,AES_DECRYPT(email,'${configs.key}') as email,AES_DECRYPT(country_code,'${configs.key}') as country_code,AES_DECRYPT(phone,'${configs.key}') as phone,AES_DECRYPT(dob,'${configs.key}') as dob,FLOOR((TIMESTAMPDIFF(MONTH, AES_DECRYPT(dob,'${configs.key}'), CURDATE()) / 12)) as age,location,UPPER(gender) as gender,status,created_at from users ${conditions} ${order}`;

    dbConfig.getDB().query(query, (err, dbData) => {
        if (err) { callback(null, []) }
        else if (dbData && dbData.length > 0) {
            for (let i = 0; dbData.length > i; i++) {
                dbData[i].user_name = dbData[i].user_name && dbData[i].user_name != "" ? dbData[i].user_name.toString() : "";
                dbData[i].email = dbData[i].email && dbData[i].email != "" ? dbData[i].email.toString() : "";
                dbData[i].country_code = dbData[i].country_code && dbData[i].country_code != "" ? dbData[i].country_code.toString() : "";
                dbData[i].phone = dbData[i].phone && dbData[i].phone != "" ? dbData[i].phone.toString() : "";
                dbData[i].dob = dbData[i].dob && dbData[i].dob != "" ? dbData[i].dob.toString() : "";
            }
            callback(null, dbData)
        }
        else { callback(null, []) }

    });
}

let addCourse = (dataToSet, callback) => {
    dbConfig.getDB().query("insert into courses set ? ", dataToSet, callback);
}

let editCourse = (dataToSet, id, callback) => {
    let query = `update courses set ? where course_id = ${id}`;
    dbConfig.getDB().query(query, dataToSet, callback)
}

let addBanner = (dataToSet, callback) => {
    let query = `insert into banner_management set ?`;
    dbConfig.getDB().query(query, dataToSet, callback)
}

let editBanner = (dataToSet, callback) => {
    let id = dataToSet.banner_id;
    delete dataToSet.banner_id;
    let query = `update banner_management set ? where banner_id = ${id}`;
    dbConfig.getDB().query(query, dataToSet, callback)
}

module.exports = {
    adminUsers: adminUsers,
    updateAdmin: updateAdmin,
    allUserList: allUserList,
    addCourse: addCourse,
    editCourse: editCourse,
    addBanner: addBanner,
    editBanner: editBanner
}