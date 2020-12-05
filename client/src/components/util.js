import moment from "moment-timezone";
import _ from "lodash";

export const getCount = (events, currentYear) => {
  const timingsByDate = {};
  let allDates = [];

  _.forEach(events, (d) => {
    if (moment(d.date).tz(moment.tz.guess()).format("YYYY") === currentYear) {
      const date = moment(d.date).tz(moment.tz.guess()).format("YYYY-MM-DD");

      const time = moment(d.date).tz(moment.tz.guess()).format("hh:mmA");
      const dateFriendly = moment(d.date)
        .tz(moment.tz.guess())
        .format("DD MMM");

      if (timingsByDate[date] !== undefined) {
        timingsByDate[date].count = timingsByDate[date].count + 1;
        timingsByDate[date].time = [...timingsByDate[date].time, time];
      } else {
        allDates.push(date);
        timingsByDate[date] = {
          count: 1,
          date: date,
          dateFriendly: dateFriendly,
          time: [time],
        };
      }
    }
  });

  let yearsAvailable =
    (events &&
      events.map((a) => moment(a.date).tz(moment.tz.guess()).format("YYYY"))) ||
    [];

  yearsAvailable = yearsAvailable
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  return { allDates, timingsByDate, yearsAvailable };
};

export const getDifference = (currentDate, allDates) => {
  if (currentDate === null) return null;

  const currentIndex = allDates.findIndex((date) => {
    const currentTextDate = moment(currentDate)
      .tz(moment.tz.guess())
      .format("YYYY-MM-DD");
    return date === currentTextDate;
  });

  const previousDate = currentIndex >= 1 && allDates[currentIndex - 1];
  const difference =
    previousDate && moment(currentDate).diff(moment(previousDate), "days");
  return difference;
};
