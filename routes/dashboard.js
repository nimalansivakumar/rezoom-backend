const express = require("express");
const {getMyResumes, deleteResume} = require("../functions/dashboard");
const router = express.Router();

router.get("/myresumes", async (req, res) => {
    const {user_id} = req.query;

    let response = await getMyResumes(user_id);
    res.status(response.status).json(response.message);
});

router.post("/delete-resume", async (req, res) => {
    const {user_id, resume_id} = req.body;

    let response = await deleteResume(user_id, resume_id);
    res.status(response.status).json(response.message);
});

module.exports = router;
