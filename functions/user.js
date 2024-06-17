const db = require("../mysql/mysql");
const executeQuery = require("../mysql/queryHandler");
const Utils = require("../Utils/Utils");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcrypt");

const createUser = async (email, password) => {
  if (email && password) {
    let query = `SELECT * FROM User WHERE EMAIL= '${email}'`;
    let isUser = await executeQuery(query);

    if (isUser.length > 0) {
      return {
        status: 200,
        message: {
          title: "user_already_exists",
        },
      };
    } else {
      let encryptedPassword = await Utils.encryptPassword(password);
      query = `INSERT INTO USER(EMAIL , PASSWORD) VALUES ('${email}' , '${encryptedPassword}')`;
      let isUserCreated = await executeQuery(query);

      if (isUserCreated) {
        const access_token = jwt.sign(email, process.env.PRIVATE_KEY);
        return {
          status: 200,
          message: {
            token: access_token,
            user_id: isUserCreated.insertId,
            title: "user_created",
          },
        };
      }
    }
  } else {
    return {
      status: 500,
      message: "input_is_undefined",
    };
  }
};

const verifyEmail = async (email) => {
  if (email) {
    let query = `SELECT * FROM User WHERE EMAIL= '${email}'`;
    let isUser = await executeQuery(query);

    if (isUser.length > 0) {
      return {
        status: 200,
        message: {
          email: isUser[0].email,
          is_user_exist: true,
        },
      };
    } else {
      return {
        status: 200,
        message: {
          is_user_exist: false,
        },
      };
    }
  } else {
    return {
      status: 500,
      message: "input_is_undefined",
    };
  }
};

const signIn = async (email, password) => {
  if (email && password) {
    let query = `SELECT * FROM User WHERE EMAIL= '${email}'`;
    let user = await executeQuery(query);
    let isPasswordMatch = false;
    if (user.length > 0) {
      let hashedPassword = user[0].PASSWORD;
      isPasswordMatch = await Utils.compareHashedPassword(
        password,
        hashedPassword
      );
    }

    if (isPasswordMatch) {
      const access_token = jwt.sign(user[0].EMAIL, process.env.PRIVATE_KEY);
      return {
        status: 200,
        message: {
          token: access_token,
          user_id: user[0].USER_ID.toString(),
          email: user[0].EMAIL,
          is_user: true,
        },
      };
    } else {
      return {
        status: 200,
        message: "wrong_password",
      };
    }
  } else {
    return {
      status: 500,
      message: "input_is_undefined",
    };
  }
};

const verifyUser = async (user_id) => {
  let query = `SELECT * FROM User WHERE USER_ID = ${user_id}`;

  let result = await executeQuery(query);

  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = { createUser, verifyEmail, signIn, verifyUser };
