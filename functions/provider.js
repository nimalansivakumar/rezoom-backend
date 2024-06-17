const executeQuery = require("../mysql/queryHandler");

const getAllUsers = async () => {
  let query = `SELECT USER_ID, EMAIL FROM USER`;
  let response = await executeQuery(query);

  if (response && response.length > 0) {
    return {
      status: 200,
      message: {
        users: response,
      },
    };
  } else {
    return {
      status: 200,
      message: {
        users: response,
      },
    };
  }
};

module.exports = {getAllUsers};
