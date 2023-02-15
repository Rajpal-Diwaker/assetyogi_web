'use strict';

const dbConfig = require("../Utilities/dbConfig");
const config = require("../Utilities/config").config;
const moment = require('moment');


let createUser = (dataToSet, callback) => {
    let query = `insert into users (status,country_code,phone,phone_otp,phone_otp_time,created_at,updated_at)  values('${dataToSet.status}',AES_ENCRYPT('${dataToSet.country_code}','${config.key}'),AES_ENCRYPT('${dataToSet.phone}','${config.key}'),'${dataToSet.phone_otp}','${dataToSet.phone_otp_time}','${dataToSet.created_at}','${dataToSet.updated_at}')`;
    dbConfig.getDB().query(query, callback);
}

let getUsers = (criteria, callback) => {
    let conditions = " ";

    if (criteria.user_id && criteria.phone) {
        criteria.user_id ? conditions += ` (user_id = '${criteria.user_id}' ` : true;
        criteria.phone ? conditions += ` and phone = '${criteria.phone}' ) ` : true;
    }
    //Other Parameters
    else {
        criteria.user_id ? conditions += ` user_id = '${criteria.user_id}'` : true;
        criteria.email ? conditions += `  AES_DECRYPT(email,'${config.key}') = '${criteria.email}'` : true;
        criteria.phone ? conditions += ` AES_DECRYPT(phone,'${config.key}') = '${criteria.phone}' and AES_DECRYPT(country_code,'${config.key}') = '${criteria.country_code}'` : true;
    }

    let find = ` user_id,AES_DECRYPT(user_name,'${config.key}') as user_name,AES_DECRYPT(email,'${config.key}') as email,AES_DECRYPT(phone,'${config.key}') as phone,AES_DECRYPT(country_code,'${config.key}') as country_code,user_image,access_token,otp_email,otp_time_email,phone_otp,phone_otp_time,status,access_token,device_id,email_verify,phone_verify,language,latitude,longitude,location,AES_DECRYPT(dob,'${config.key}') as dob`;

    let query = `select ${find} from users where ${conditions}`;
    dbConfig.getDB().query(query, (err, dbData) => {
        if (err) { callback(null, []) }
        else if (dbData && dbData.length > 0) { callback(null, dbData) }
        else { callback(null, []) }
    });
}

let editProfile = (criteria, user_id, callback) => {
    let conditions = " ";
    criteria.user_name ? conditions += ` user_name = AES_ENCRYPT('${criteria.user_name}','${config.key}'), ` : true;
    criteria.email ? conditions += `  email = AES_ENCRYPT('${criteria.email}','${config.key}'),` : true;
    criteria.dob ? conditions += ` dob = AES_ENCRYPT('${criteria.dob}','${config.key}'), ` : true;
    criteria.gender ? conditions += ` gender = '${criteria.gender}', ` : true;

    criteria.language ? conditions += ` language = '${criteria.language}', ` : true;
    criteria.latitude ? conditions += ` latitude = '${criteria.latitude}', ` : true;
    criteria.longitude ? conditions += ` longitude = '${criteria.longitude}', ` : true;
    criteria.location ? conditions += ` location = '${criteria.location}', ` : true;

    conditions += ` updated_at = '${moment().format("YYYY-MM-DD hh:mm:ss")}' `;
    dbConfig.getDB().query(`update users set ${conditions} where user_id = ${user_id}`, callback);
}

let editPhone = (criteria, user_id, callback) => {
    let query = `update users set phone = AES_ENCRYPT('${criteria.phone}','${config.key}'),old_phone = AES_ENCRYPT('${criteria.phone}','${config.key}') where user_id = ${user_id}`;
    dbConfig.getDB().query(query, callback);
}

let addStuff = (dataToSet, callback) => {
    dbConfig.getDB().query("select * from users_stuffs where user_id = ? and course_id = ? and stuff_type = ?", [dataToSet.user_id, dataToSet.course_id, dataToSet.stuff_type], (err, result) => {
        if (err || !result || (result && result.length == 0)) {
            dbConfig.getDB().query("insert into users_stuffs set ? ", dataToSet, callback);
        }
        else if (result && result.length > 0) {
            let id = result[0].id
            dbConfig.getDB().query(`update users_stuffs set ? where id= '${id}'`, dataToSet, callback)
        }
        else {
            dbConfig.getDB().query("insert into users_stuffs set ? ", dataToSet, callback);
        }
    });
}
module.exports = {
    getUsers: getUsers,
    createUser: createUser,
    editProfile: editProfile,
    editPhone: editPhone,
    addStuff: addStuff
}