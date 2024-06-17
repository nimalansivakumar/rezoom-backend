const express = require("express");
const { saveResume, saveResumeData } = require("../functions/resume");
const { deleteResume } = require("../functions/dashboard");
const { getResumeDetail } = require("../functions/edit");
const { verifyUser } = require("../functions/user");
const { Storage } = require("@google-cloud/storage");
const router = express.Router();

router.post("/save-resume", (req, res) => {
  let { user_id, resume_name, resume_data, created_time } = req.body;

  saveResume(user_id, resume_name, created_time).then(async (resume_id) => {
    if (resume_id) {
      let response = await saveResumeData(resume_id, JSON.parse(resume_data));
      res.status(response.status).json(response.message);
    }
  });
});

router.post("/update-resume", (req, res) => {
  let { user_id, resume_id, resume_name, resume_data, created_time } = req.body;

  deleteResume(user_id, resume_id).then(() => {
    saveResume(user_id, resume_name, created_time).then(async (resume_id) => {
      if (resume_id) {
        let response = await saveResumeData(resume_id, JSON.parse(resume_data));
        res.status(response.status).json(response.message);
      }
    });
  });
});

router.get("/resume-detail", async (req, res) => {
  let { resume_id } = req.query;
  let response = await getResumeDetail(resume_id);
  res.status(response.status).json(response.message);
});

router.post("/save-profilepicture", async (req, res) => {
  // let image = req.files.image
  // console.log(image)
  // let fileName = image.name;
  // await image.mv("/Users/nimalan-pt6454/Desktop/rz-backend/uploads/" + image.name, (err) => {
  //     if (err) {
  //         throw new Error("Unable to save file to local path" + err);
  //     } else {
  //         console.log("File saved to uploads folder")
  //     }
  // })
  //
  // const bucketName = "rezoom-2fa7a.appspot.com";
  // let serverKey ="AAAAVhHqcTk:APA91bFFXGw5H7faOGq5zZZmhD-ixuEhfM30AGOtuGpdfyT_thmfAU0bgF-HgXK-RZIpgbYfDnqkKYOgGNH0j8zFr0bgBebUZzJJ4ymnIcUnsSrn5vzni842Y4kAMnmuuIeLL6PJx5Cq"
  // const storage = new Storage({
  //     token: serverKey,
  // })
  //
  // try {
  //     await storage.bucket(bucketName).upload("/Users/nimalan-pt6454/Desktop/rz-backend/uploads/test.jpeg", {
  //         // Support for HTTP requests made with `Accept-Encoding: gzip`
  //         gzip: true,
  //         // By setting the option `destination`, you can change the name of the
  //         // object you are uploading to a bucket.
  //         metadata: {
  //             // Enable long-lived HTTP caching headers
  //             // Use only if the contents of the file will never change
  //             // (If the contents will change, use cacheControl: 'no-cache')
  //             cacheControl: 'public, max-age=31536000',
  //         },
  //     })
  // } catch (err) {
  //     throw new Error("Error in File Upload : " + err);
  // }
});

module.exports = router;
