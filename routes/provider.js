const { getAllUsers } = require("../functions/provider");
const router = require("./signin");

router.get("/user-provider", async (req, res) => {
  let response = await getAllUsers();
  res.status(response.status).json(response.message);
});

module.exports = router;
