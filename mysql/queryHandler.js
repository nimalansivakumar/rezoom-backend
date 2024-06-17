const db = require("./mysql");

const executeQuery = (queryString, bulkValues) => {
    return new Promise((resolve, reject) => {
        if (!bulkValues) {
            db().query(queryString, (err, results, fields) => {
                if (!err) {
                    resolve(results);
                } else {
                    throw new Error("QueryHandler throwing -> " + err);
                }
            });
            db().end();
        } else {
            // bulkValues is an array of arrays wrapped in an array
            db().query(queryString, [bulkValues], (err, results, fields) => {
                if (!err) {
                    resolve(results);
                } else {
                    console.log("------------------------------")
                    console.log(queryString)
                    console.log("------------------------------")
                    console.log(bulkValues)
                    console.log("------------------------------")
                    throw new Error("QueryHandler throwing -> " + err);
                }
            });
            db().end();
        }
    });
};

module.exports = executeQuery;
