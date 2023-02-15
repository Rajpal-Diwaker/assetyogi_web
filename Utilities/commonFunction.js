const FCM = require('fcm-push'),
    dbConfig = require("./dbConfig"),
    // serverKey = require('./config').config.fcm.server_key;
    serverKey = require('./config');


module.exports = {
    "ANDROID_NOTIFICATION": function (deviceToken, msg, title, type, count, alert_id, alert_object) {
        let fcm = new FCM(serverKey);

        let tokens_string = deviceToken != '' ? deviceToken.split(',') : '';
        let message = {
            "registration_ids": tokens_string,
            "data": {
                "title": title, "type": type, "msg": msg, "alert_id": alert_id, "count": count, "alert_object": alert_object
            },
        };
        fcm.send(message, function (err, response) {
            if (err) {
                console.log("errror" + err);
            } else {
                console.log("Successfully sent with response: " + response);
            }
        });
    },
    "SENDER_DATA": async function (device_id, msg, title, type, count, alert_id, alert_object) {

        let reciever_data = await settingDetails(device_id);
        if (reciever_data.week_tip == '0' && type == 'WeekTip') {
            console.log(1);
            return
        }
        else if (reciever_data.transaction_summary == '0' && type == 'Summary') {
            console.log(2);
            return
        }
        else if (reciever_data.daily_digest_email == '0' && type == 'DailyDigest') {
            console.log(3);
            return
        }
        else if (reciever_data.fraudulent_sms_alert == '0' && alert_id == '1') {
            console.log(4);
            return
        }
        else if (reciever_data.upi_fraud_alert == '0' && alert_id == '2') {
            console.log(5);
            return
        }
        else if (reciever_data.sim_swap_alert == '0' && alert_id == '3') {
            console.log(6);
            return
        }
        else if (reciever_data.malicious_app_alert == '0' && alert_id == '4') {
            console.log(7);
            return
        }
        else if (reciever_data.otp_alert == '0' && alert_id == '6') {
            console.log(8);
            return
        }
        else {
            this.ANDROID_NOTIFICATION(device_id, msg, title, type, count, alert_id, alert_object);
        }
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function settingDetails(obj) {
    return new Promise((resolve, reject) => {
        let query = `SELECT *,(select user_id from users where device_id = '${obj}') as device_id from settings having settings.user_id = device_id`
        dbConfig.getDB().query(query, (err, dbData) => {
            if (err || !dbData || dbData.length == 0) {
                resolve({})
            }
            else if (dbData && dbData.length > 0) {
                resolve(dbData[0])
            }
            else {
                resolve({})
            }
        })
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////