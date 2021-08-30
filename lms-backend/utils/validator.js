const { body, validationResult } = require("express-validator");
const moment = require("moment");
const User = require("../models/User");
const Team = require("../models/Team");

const addLeaveValidationRules = () => {
  return [
    body("startdate")
      .notEmpty()
      .withMessage("startdate cant be empty")
      .bail()
      .custom((startdate, { req }) => {
        // Check for valid date format
        const result = moment(startdate, "YYYY-MM-DD", true).isValid();
        if (!result) {
          return Promise.reject(
            `Invalid Start Date. Please enter a valid date in the format 'YYYY-MM-DD'`
          );
        }

        // Check to compare start date must be current date or in the future.
        // if (moment(startdate).isBefore(moment(), "days")) {
        //   return Promise.reject(`Invalid Start Date. It must be current date or the future date`);
        // }

        // Check for weekday
        const weekendDays = [0, 6];
        if (weekendDays.includes(moment(startdate).day())) {
          return Promise.reject(`Invalid Start Date. It cant be a Saturday or Sunday`);
        }

        // Check to compare start date must be on or before end date
        if (moment(req.body.enddate).isBefore(moment(startdate), "days")) {
          return Promise.reject(`Invalid Start Date. It must be less than or equal to End Date`);
        }
        return true;
      }),
    body("enddate")
      .notEmpty()
      .withMessage("enddate cant be empty")
      .bail()
      .custom((enddate, { req }) => {
        // Check for valid date format
        const result = moment(enddate, "YYYY-MM-DD", true).isValid();
        if (!result) {
          return Promise.reject(
            `Invalid End Date. Please enter a valid date in the format 'YYYY-MM-DD'`
          );
        }

        // Check for weekday
        const weekendDays = [0, 6];
        if (weekendDays.includes(moment(enddate).day())) {
          return Promise.reject(`Invalid End Date. It cant be a Saturday or Sunday`);
        }

        // Check to compare enddate must be current date or in the future.
        // if (moment(enddate).isBefore(moment(), "days")) {
        //   return Promise.reject(`Invalid End Date. It must be current date or the future date`);
        // }

        // Check to compare enddate must be on or after the startdate
        if (moment(enddate).isBefore(moment(req.body.startdate), "days")) {
          return Promise.reject(`Invalid End Date. It must be greater than or equal to Start Date`);
        }

        return true;
      }),
  ];
};

const signupValidationRules = () => {
  return [
    body("firstname", "firstname cant be empty").notEmpty(),
    body("lastname", "lastname cant be empty").notEmpty(),
    body("username").notEmpty().withMessage("username cant be empty"),
    body("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    body("team").notEmpty().withMessage("team cant be empty"),
  ];
};

const signinValidationRules = () => {
  return [
    body("username", "username cant be empty").notEmpty(),
    body("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ];
};

const addTeamValidations = () => {
  return [
    body("teamname")
      .notEmpty()
      .withMessage("Team Name cant be empty")
      .bail()
      .custom(async (teamname, { req }) => {
        teamname = teamname && teamname.toUpperCase();
        const team = await Team.findOne({ name: teamname });
        if (team) {
          return Promise.reject("Team already exists with this name. ");
        }
        return true;
      }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
  signupValidationRules,
  signinValidationRules,
  addLeaveValidationRules,
  addTeamValidations,
  validate,
};
