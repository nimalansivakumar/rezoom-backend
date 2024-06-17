var mysql = require("mysql2");

var db = () => {
  var mysqlCredentials = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

  try {
    mysqlCredentials.connect((err) => {
      if (!err) {
        console.log("Connection Established with MySQL");
      }
    });
    mysqlCredentials.query("USE PLANETSCALE");

    return mysqlCredentials;
  } catch (err) {
    throw new Error("MySql failed to connect");
  }
};

module.exports = db;
