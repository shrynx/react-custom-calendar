import parse from 'date-fns/parse';
import getDay from 'date-fns/get_day';
import subDays from 'date-fns/sub_days';

import { WEEK_DAYS } from './constants';
import { dateRange } from './dateUtils';

const getCalendarWeek = date => {
  // current
  const currentDate = parse(date);
  // total number of days
  const totalDays = WEEK_DAYS;
  // number of days from start of current week
  const numberOfDaysFromWeekStart = getDay(currentDate);
  // start date for current week
  const weekStartDate = subDays(currentDate, numberOfDaysFromWeekStart);
  // generate range for week
  return dateRange(totalDays, weekStartDate);
};

export default getCalendarWeek;
