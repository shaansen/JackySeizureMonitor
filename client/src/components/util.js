import moment from "moment-timezone";
import _ from "lodash";

export const getCount = (events, currentYear) => {
  const timingsByDate = {};

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

  return { timingsByDate, yearsAvailable };
};
