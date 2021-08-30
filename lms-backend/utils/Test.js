const moment = require("moment");

const calculateNumberOfDays = (sdate, edate) => {
  let start = moment(sdate);
  let end = moment(edate);
  let weekdayCounter = 0;
  while (start <= end) {
    if (start.format("ddd") !== "Sat" && start.format("ddd") !== "Sun") {
      weekdayCounter++;
    }
    start = moment(start).add(1, "days");
  }

  return weekdayCounter;
};

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

const leavesGroupByMonth = () => {
  const data = [
    {
      _id: "61216db09bdaa53854ff6b02",
      startdate: "2021-08-23T00:00:00.000Z",
      enddate: "2021-09-01T00:00:00.000Z",
      user: {
        _id: "612007c47e86598a5834d83a",
      },
    },
    {
      _id: "612190e9bbbda444b43f199f",
      startdate: "2021-08-27T00:00:00.000Z",
      enddate: "2021-08-30T00:00:00.000Z",
      user: {
        _id: "612007c47e86598a5834d83a",
      },
    },
    {
      _id: "61200ba9f6fc153b387785e7",
      startdate: "2021-08-31T00:00:00.000Z",
      enddate: "2021-08-31T00:00:00.000Z",
      user: {
        _id: "612008a67e86598a5834d84c",
      },
    },
  ];

  const extractedDays = data.map((leave) => {
    const sdate = leave.startdate.substring(0, 10),
      edate = leave.enddate.substring(0, 10),
      leaveDates = extractWeekDaysBetweenTwoDates(sdate, edate);

    return leaveDates.map((ldate) => {
      return {
        id: leave._id,
        user: leave.user._id,
        leaveDate: ldate,
        leaveMonth: ldate.substring(5, 7),
      };
    });
  });

  const extractedData = extractedDays.flat();
  // const groupByYear = groupBy("leaveMonth");
  return groupBy("leaveMonth")(extractedData);
};

// console.log(extractWeekDaysBetweenTwoDates("2021-08-31", "2021-08-31"));
// console.log(calculateNumberOfDays("2021-08-23", "2021-08-23"));
console.log(leavesGroupByMonth());
