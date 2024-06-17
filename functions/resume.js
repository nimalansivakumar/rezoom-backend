const executeQuery = require("../mysql/queryHandler");

const saveResume = async (user_id, resume_name, created_time) => {
  let query = `INSERT INTO Resumes(USER_ID, RESUME_TITLE, DATE_CREATED) VALUES
    (${user_id} , '${resume_name}' , '${created_time}')`;

  let result = await executeQuery(query);
  if (result) {
    return result.insertId;
  } else {
    return null;
  }
};

const saveResumeData = async (resume_id, resume_data) => {
  const {
    name,
    job_role,
    summary,
    mobile,
    email,
    location,
    website,
    skills,
    experiences,
    education,
    projects,
    achievements,
    interests,
    languages,
    template_id,
    font,
  } = resume_data;
  console.log(resume_data);

  try {
    let query = `INSERT INTO ResumeInfo(RESUME_ID, NAME, JOB_ROLE, MOBILE, EMAIL,
      WEBSITE, LOCATION, ABOUT) VALUES(${resume_id} , '${name}' , '${job_role}', '${mobile}' , '${email}' , '${website}'
      ,'${location}' , '${summary}')`;

    let result = await executeQuery(query);
    let infoId = result.insertId;

    //insert skills
    query = "INSERT INTO Skills(INFO_ID, SKILL_NAME) VALUES ?";
    result = await executeQuery(
      query,
      getInsertableArray(infoId, skills, Object.keys(skills[0]))
    );

    //insert interests
    query = "INSERT INTO Interests(INFO_ID, INTEREST_NAME) VALUES ?";
    result = await executeQuery(
      query,
      getInsertableArray(infoId, interests, Object.keys(interests[0]))
    );

    //insert languages
    query = "INSERT INTO Languages(INFO_ID, LANGUAGE_NAME) VALUES ?";
    result = await executeQuery(
      query,
      getInsertableArray(infoId, languages, Object.keys(languages[0]))
    );

    //insert achievements
    query = "INSERT INTO Achievements(INFO_ID, ACHIEVEMENT_SUMMARY) VALUES ?";
    result = await executeQuery(
      query,
      getInsertableArray(infoId, achievements, Object.keys(achievements[0]))
    );

    //insert experiences
    query =
      "INSERT INTO Experiences(INFO_ID, COMPANY_NAME, ROLE, YEAR, DESCRIPTION ) VALUES ?";
    result = await executeQuery(
      query,
      getInsertableArray(infoId, experiences, Object.keys(experiences[0]))
    );

    //insert education
    query =
      "INSERT INTO Education (INFO_ID, SCHOOL_NAME, MAJOR, YEAR, LOCATION) VALUES ?";
      result = await executeQuery(
        query,
        getInsertableArray(infoId, education, Object.keys(education[0]))
      );

    //insert projects
    query =
      "INSERT INTO Projects(INFO_ID, PROJECT_NAME, DESCRIPTION, URL) VALUES ?";
    result = await executeQuery(
      query,
      getInsertableArray(infoId, projects, Object.keys(projects[0]))
    );

    //insert resume meta data
    query = `INSERT INTO ResumeMeta(RESUME_ID, FONT, TEMPLATE_ID)
    VALUES (${resume_id} , '${font}' , '${template_id}')`;
    result = await executeQuery(query);

    return {
      status: 201,
      message: {
        resume_id: resume_id,
        message: "resume_saved",
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "resume_save_failed",
    };
  }
};

//get the array format to be inserted into the query
const getInsertableArray = (id, baseData, keys) => {
  let insertArr;

  if (typeof baseData[0] == "object") {
    //filter out object properties without id
    keys = keys.filter((prop) => prop !== "id");
    insertArr = baseData.map((data) => {
      let entity = [];
      entity.push(id);
      keys.forEach((key) => entity.push(data[key]));
      return entity;
    });
  } else {
    insertArr = baseData.map((data) => {
      return [id, data];
    });
  }
  return insertArr;
};

module.exports = { saveResume, saveResumeData };
