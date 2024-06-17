const executeQuery = require("./queryHandler");

const defaultQueries = [
  {
    table_name: "user-table",
    query_1: `CREATE TABLE IF NOT EXISTS User (USER_ID INT NOT NULL AUTO_INCREMENT, EMAIL VARCHAR(100) NOT NULL, PASSWORD VARCHAR(100) NOT NULL, PRIMARY KEY (USER_ID))`,
    query_2: `ALTER TABLE User AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
  {
    table_name: "resumes-table",
    query_1: `CREATE TABLE IF NOT EXISTS Resumes (RESUME_ID INT NOT NULL AUTO_INCREMENT, USER_ID INT NOT NULL, RESUME_TITLE VARCHAR(225), DATE_CREATED DATE, PRIMARY KEY(RESUME_ID))`,
    query_2: `ALTER TABLE Resumes AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
  {
    table_name: "resumeinfo-table",
    query_1: `CREATE TABLE IF NOT EXISTS ResumeInfo (INFO_ID INT NOT NULL auto_increment ,RESUME_ID INT NOT NULL, NAME VARCHAR(225) , JOB_ROLE VARCHAR(225) , MOBILE VARCHAR(225) ,
EMAIL VARCHAR(225), WEBSITE VARCHAR(225), LOCATION VARCHAR(225), ABOUT VARCHAR(225), PRIMARY KEY (INFO_ID), 
FOREIGN KEY(RESUME_ID) REFERENCES RESUMES(RESUME_ID))`,
    query_2: `ALTER TABLE ResumeInfo AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
  {
    table_name: "skills-table",
    query_1: `CREATE TABLE IF NOT EXISTS Skills (SKILL_ID INT NOT NULL auto_increment , INFO_ID INT NOT NULL, SKILL_NAME VARCHAR(225), PRIMARY KEY (SKILL_ID),
FOREIGN KEY(INFO_ID) REFERENCES RESUMEINFO(INFO_ID))`,
    query_2: `ALTER TABLE Skills AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
  {
    table_name: "interests-table",
    query_1: `CREATE TABLE IF NOT EXISTS Interests (INTEREST_ID INT NOT NULL auto_increment , INFO_ID INT NOT NULL, INTEREST_NAME VARCHAR(225), PRIMARY KEY (INTEREST_ID),
FOREIGN KEY(INFO_ID) REFERENCES RESUMEINFO(INFO_ID))`,
    query_2: `ALTER TABLE Interests AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
  {
    table_name: "achievements-table",
    query_1: `CREATE TABLE IF NOT EXISTS Achievements (ACH_ID INT NOT NULL auto_increment , INFO_ID INT NOT NULL, ACHIEVEMENT_SUMMARY VARCHAR(225), PRIMARY KEY (ACH_ID),
FOREIGN KEY(INFO_ID) REFERENCES RESUMEINFO(INFO_ID)`,
    query_2: `ALTER TABLE Achievements AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
  {
    table_name: "languages-table",
    query_1: `CREATE TABLE IF NOT EXISTS Languages (LANG_ID INT NOT NULL auto_increment , INFO_ID INT NOT NULL, LANGUAGE_NAME VARCHAR(225), PRIMARY KEY (LANG_ID),
FOREIGN KEY(INFO_ID) REFERENCES RESUMEINFO(INFO_ID))`,
    query_2: `ALTER TABLE Languages AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
  {
    table_name: "experiences-table",
    query_1: `CREATE TABLE IF NOT EXISTS Experiences (EXP_ID INT NOT NULL auto_increment , INFO_ID INT NOT NULL, COMPANY_NAME VARCHAR(225), ROLE VARCHAR(225),
    YEAR VARCHAR(225), DESCRIPTION VARCHAR(225),  PRIMARY KEY (EXP_ID),FOREIGN KEY(INFO_ID) REFERENCES RESUMEINFO(INFO_ID))`,
    query_2: `ALTER TABLE Experiences AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
  {
    table_name: "education-table",
    query_1: ` CREATE TABLE IF NOT EXISTS Education (EDU_ID INT NOT NULL auto_increment , INFO_ID INT NOT NULL, SCHOOL_NAME VARCHAR(225), MAJOR VARCHAR(225),
    YEAR VARCHAR(225), LOCATION VARCHAR(225), PRIMARY KEY (EDU_ID),FOREIGN KEY(INFO_ID) REFERENCES RESUMEINFO(INFO_ID))`,
    query_2: `ALTER TABLE Education AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
  {
    table_name: "projects-table",
    query_1: `CREATE TABLE IF NOT EXISTS Projects (PROJECT_ID INT NOT NULL auto_increment , INFO_ID INT NOT NULL, PROJECT_NAME VARCHAR(225), DESCRIPTION VARCHAR(225),
    URL VARCHAR(225), PRIMARY KEY (PROJECT_ID),FOREIGN KEY(INFO_ID) REFERENCES RESUMEINFO(INFO_ID))`,
    query_2: `ALTER TABLE Projects AUTO_INCREMENT = ${Math.floor(
      100000 + Math.random() * 900000
    )}`,
  },
];

const insertTablesIfNotExists = () => {
  try {
    defaultQueries.forEach((query) => {
      executeQuery(query.query_1);
      executeQuery(query.query_2);
    });
  } catch (err) {
    throw Error("Unable to insert tables");
  }
};
module.exports = { defaultQueries, insertTablesIfNotExists };
