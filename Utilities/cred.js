require('dotenv').config();
let serverURLs = {
    "localdev": {
        "NODE_SERVER": process.env.NODE_SERVER,
        "NODE_SERVER_PORT": process.env.NODE_SERVER_PORT,
        "MYSQL_HOST": process.env.MYSQL_HOST,
        "MYSQL_USER": process.env.MYSQL_USER,
        "MYSQL_PASSWORD": process.env.MYSQL_PASSWORD,
        'MYSQL_DATABASE': process.env.MYSQL_DATABASE,
        "EMAIL_USER": process.env.EMAIL_USER,
        "EMAIL_PASS": process.env.EMAIL_PASS,
        "EMAIL_HOST": process.env.EMAIL_HOST,
        "EMAIL_PORT": process.env.EMAIL_PORT,
        "EMAIL_SECURE": process.env.EMAIL_SECURE,
        "EMAIL_TLS": process.env.EMAIL_TLS,
        "webUrl": process.env.webUrl,
        "socket_url": process.env.local_socket,
    },
    "dev": {
        "NODE_SERVER": process.env.NODE_SERVER_DEV,
        "NODE_SERVER_PORT": process.env.NODE_SERVER_PORT_DEV,
        "MYSQL_HOST": process.env.MYSQL_HOST_DEV,
        "MYSQL_USER": process.env.MYSQL_USER_DEV,
        "MYSQL_PASSWORD": process.env.MYSQL_PASSWORD_DEV,
        'MYSQL_DATABASE': process.env.MYSQL_DATABASE_DEV,
        "EMAIL_USER": process.env.EMAIL_USER_DEV,
        "EMAIL_PASS": process.env.EMAIL_PASS_DEV,
        "EMAIL_HOST": process.env.EMAIL_HOST_DEV,
        "EMAIL_PORT": process.env.EMAIL_PORT_DEV,
        "EMAIL_SECURE": process.env.EMAIL_SECURE_DEV,
        "EMAIL_TLS": process.env.EMAIL_TLS_DEV,
        "webUrl": process.env.webUrl_DEV,
        "socket_url": process.env.local_socket_DEV,
    },
    "key": process.env.key
}

module.exports = {
    serverURLs
}