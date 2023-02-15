const environment = require('./environment').environment;
const serverURLs = require("./cred").serverURLs;

const config = {
    "DB_URL": {
        "host": `${serverURLs[environment].MYSQL_HOST}`,
        "user": `${serverURLs[environment].MYSQL_USER}`,
        "password": `${serverURLs[environment].MYSQL_PASSWORD}`,
        "database": `${serverURLs[environment].MYSQL_DATABASE}`
    },
    "EMAIL_CONFIG": {
        "host": `${serverURLs[environment].EMAIL_HOST}`,
        "port": `${serverURLs[environment].EMAIL_PORT}`,
        "secure": `${serverURLs[environment].EMAIL_SECURE}`,
        "requireTLS": `${serverURLs[environment].EMAIL_TLS}`,
        "auth": {
            "user": `${serverURLs[environment].EMAIL_USER}`,
            "pass": `${serverURLs[environment].EMAIL_PASS}`,
        },
        "auth_welcome": {
            "user": `${serverURLs[environment].EMAIL_USER_WELCOME}`,
            "pass": `${serverURLs[environment].EMAIL_PASS_WELCOME}`,
        }
    },
    "NODE_SERVER_PORT": {
        "port": `${serverURLs[environment].NODE_SERVER_PORT}`
    },
    "NODE_SERVER_URL": {
        "url": `${serverURLs[environment].NODE_SERVER}`
    },
    "webURL": `${serverURLs[environment].webUrl}`,
    "key": serverURLs.key
};
module.exports = {
    config: config
};
