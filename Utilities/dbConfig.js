var config = require("../Utilities/config").config;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: config.DB_URL.host,
    user: config.DB_URL.user,
    password: config.DB_URL.password,
    database: config.DB_URL.database,
    charset: 'utf8mb4',
    dbcollat: 'utf8mb4_unicode_ci'

});
connection.connect((err) => {
    if (err) {
        // throw err;
        connection = reconnect(connection);
    }
    console.log("Database connect successfully.");
});


//- Reconnection function
function reconnect(connection) {
    console.log("\n New connection tentative...");
    if (connection) connection.destroy();

    //- Create a new one
    var connection = mysql.createConnection({
        host: config.DB_URL.host,
        user: config.DB_URL.user,
        password: config.DB_URL.password,
        database: config.DB_URL.database,
        charset: 'utf8mb4',
        dbcollat: 'utf8mb4_unicode_ci'
    
    });

    //- Try to reconnect
    connection.connect(function (err) {
        if (err) {
            //- Try to connect every 2 seconds.
            setTimeout(reconnect, 2000);
        } else {
            console.log("\n\t *** New connection established with the database. ***")
            return connection;
        }
    });
}


let getDB = () => {
    return connection;
}
module.exports = {
    getDB: getDB
}
