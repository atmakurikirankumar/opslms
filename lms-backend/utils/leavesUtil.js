const moment = require("moment");

const extractWeekDaysBetweenTwoDates = (sdate, edate) => {
  let startdate = moment(sdate),
    enddate = moment(edate);
  const now = startdate.clone(),
    dates = [];

  while (now.isSameOrBefore(enddate)) {
    if (now.format("ddd") !== "Sat" && now.format("ddd") !== "Sun") {
      dates.push(now.format("YYYY-MM-DD"));
    }
    now.add(1, "days");
  }
  return dates;
};

const groupBy = (key) => (data) => {
  return data.reduce((acc, obj) => {
    const property = obj[key];
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});
};

module.exports = { extractWeekDaysBetweenTwoDates, groupBy };
