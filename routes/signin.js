const { createUser, verifyEmail, signIn } = require("../functions/user");
const db = require("../mysql/mysql");
const executeQuery = require("../mysql/queryHandler");
const Utils = require("../Utils/Utils");
const router = require("express").Router();

router.get("/verify-email", async (req, res) => {
  const { email } = req.query;
  let response = await verifyEmail(email);
  res.status(response.status).json(response.message);
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  let response = await signIn(email, password);
  if (response.message.token) {
    res
      .cookie("rz_token", response.message.token, {
        httpOnly: true,
        secure: true,
      })
      .status(response.status)
      .json(response.message);
  } else {
    res.status(response.status).json(response.message);
  }
});

router.post("/createuser", async (req, res) => {
  const { email, password } = req.body;
  let response = await createUser(email, password);
  if (response.status === 409) {
    res.status(response.status).json(response.message);
  } else {
    res
      .cookie("rz_token", response.message.token, {
        httpOnly: true,
        secure: true,
      })
      .status(response.status)
      .json(response.message);
  }
});

module.exports = router;
