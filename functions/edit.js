const executeQuery = require("../mysql/queryHandler");

const getResumeDetail = async (resume_id) => {

    let resumeInfo = {};
    let infoId, result, query;

    if (resume_id) {
        query = `SELECT * FROM Resumes INNER JOIN ResumeInfo ON Resumes.RESUME_ID = ResumeInfo.RESUME_ID INNER JOIN 
                ResumeMeta ON ResumeMeta.RESUME_ID = Resumes.RESUME_ID WHERE Resumes.RESUME_ID = ${resume_id}`;
        result = await executeQuery(query);
        if (result && result.length > 0) {
            result = result[0];
            infoId = result.INFO_ID;
            resumeInfo["resume_id"] = result.RESUME_ID;
            resumeInfo["resume_title"] = result.RESUME_TITLE;
            resumeInfo["created_date"] = result.DATE_CREATED;
            resumeInfo["name"] = result.NAME;
            resumeInfo["job_role"] = result.JOB_ROLE;
            resumeInfo["mobile"] = result.MOBILE;
            resumeInfo["email"] = result.EMAIL;
            resumeInfo["location"] = result.LOCATION;
            resumeInfo["website"] = result.WEBSITE;
            resumeInfo["summary"] = result.ABOUT;
            resumeInfo["meta_info"] = {
                font: result.FONT,
                template_id: result.TEMPLATE_ID,
            }
        }


        if (infoId) {
            //get skills
            query = `SELECT SKILL_ID, SKILL_NAME FROM Skills WHERE Skills.INFO_ID = ${infoId}`;
            result = await executeQuery(query);
            let skillsArr = [];
            if (result.length > 0) {
                result.forEach((skill) => {
                    let tempObj = {};
                    tempObj["id"] = skill.SKILL_ID;
                    tempObj["skill_name"] = skill.SKILL_NAME
                    skillsArr.push(tempObj);
                })
            }
            resumeInfo["skills"] = skillsArr;

            //get interests
            query = `SELECT INTEREST_ID, INTEREST_NAME FROM Interests WHERE Interests.INFO_ID = ${infoId}`;
            result = await executeQuery(query);
            let interestArr = [];
            if (result.length > 0) {
                result.forEach((interest) => {
                    let tempObj = {};
                    tempObj["id"] = interest.INTEREST_ID;
                    tempObj["interest_name"] = interest.INTEREST_NAME;
                    interestArr.push(tempObj)
                })
            }
            resumeInfo["interests"] = interestArr;

            //get achievements
            query = `SELECT ACH_ID, ACHIEVEMENT_SUMMARY FROM Achievements WHERE Achievements.INFO_ID = ${infoId}`;
            result = await executeQuery(query);
            let achArr = [];
            if (result.length > 0) {
                result.forEach((ach) => {
                    let tempObj = {};
                    tempObj["id"] = ach.ACH_ID;
                    tempObj["achievement_name"] = ach.ACHIEVEMENT_SUMMARY;
                    achArr.push(tempObj)
                })
            }
            resumeInfo["achievements"] = achArr;

            //get languages
            query = `SELECT LANG_ID, LANGUAGE_NAME FROM Languages WHERE Languages.INFO_ID = ${infoId}`;
            result = await executeQuery(query);
            let langArr = [];
            if (result.length > 0) {
                result.forEach((language) => {
                    let tempObj = {};
                    tempObj["id"] = language.LANG_ID;
                    tempObj["lang_name"] = language.LANGUAGE_NAME;
                    langArr.push(tempObj);
                })
            }
            resumeInfo["languages"] = langArr;

            //get experiences
            query = `SELECT EXP_ID, COMPANY_NAME, ROLE, YEAR, DESCRIPTION FROM Experiences WHERE Experiences.INFO_ID = ${infoId}`;
            result = await executeQuery(query);
            let expArr = [];
            if (result.length > 0) {
                result.forEach((expObj) => {
                    let tempObj = {};
                    tempObj["id"] = expObj.EXP_ID;
                    tempObj["company_name"] = expObj.COMPANY_NAME;
                    tempObj["description"] = expObj.DESCRIPTION;
                    tempObj["role"] = expObj.ROLE;
                    tempObj["duration"] = expObj.YEAR;
                    expArr.push(tempObj)
                })
            }
            resumeInfo["experiences"] = expArr;

            //get education
            query = `SELECT EDU_ID, SCHOOL_NAME, MAJOR, YEAR, LOCATION FROM Education WHERE Education.INFO_ID = ${infoId}`;
            result = await executeQuery(query);
            let eduArr = [];
            if (result.length > 0) {
                result.forEach((eduObj) => {
                    let tempObj = {};
                    tempObj["id"] = eduObj.EDU_ID;
                    tempObj["school_name"] = eduObj.SCHOOL_NAME;
                    tempObj["major"] = eduObj.MAJOR;
                    tempObj["year"] = eduObj.YEAR;
                    tempObj["location"] = eduObj.LOCATION;
                    eduArr.push(tempObj)
                })
            }
            resumeInfo["education"] = eduArr;

            //get projects
            query = `SELECT PROJECT_ID, PROJECT_NAME, DESCRIPTION, URL FROM Projects WHERE Projects.INFO_ID = ${infoId}`;
            result = await executeQuery(query);
            let projectArr = [];
            if (result.length > 0) {
                result.forEach((projObj) => {
                    let tempObj = {};
                    tempObj["id"] = projObj.PROJECT_ID;
                    tempObj["project_name"] = projObj.PROJECT_NAME;
                    tempObj["description"] = projObj.DESCRIPTION;
                    tempObj["url"] = projObj.URL;
                    projectArr.push(tempObj)
                })
            }
            resumeInfo["projects"] = projectArr;
        }
        return {
            status: 200,
            message: {
                resume_detail: resumeInfo,
            },
        };
    } else {
        return {
            status: 400,
            message: "something-gone-wrong",
        };
    }
};

module.exports = {getResumeDetail};
