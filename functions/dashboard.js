const executeQuery = require("../mysql/queryHandler");

const getMyResumes = async (userId) => {
  if (userId) {
    let query = `SELECT * FROM Resumes WHERE USER_ID = ${userId}`;
    let result = await executeQuery(query);
    return {
      status: 200,
      message: {
        resumes: result,
      },
    };
  } else {
    return {
      status: 400,
      message: "UserID is empty",
    };
  }
};

const deleteResume = async (userId, resumeId) => {

  let result;

  if(userId && resumeId){
    let query = `DELETE FROM Resumes WHERE USER_ID=${userId} AND RESUME_ID=${resumeId}`;
    result = await executeQuery(query);
  }

  if(result){
    return {
      status : 204,
      message : "resume-deleted"
    }
  }else{
    return {
      status: 404,
      message: "unable-to-delete-resume"
    }
  }
};

module.exports = { getMyResumes, deleteResume };
