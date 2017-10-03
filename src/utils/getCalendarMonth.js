import getDay from 'date-fns/get_day';
import subDays from 'date-fns/sub_days';

import { TOTAL_WEEKS, WEEK_DAYS } from './constants';
import { dateRange } from './dateUtils';

const getCalendarMonth = startOfCurrentMonth => {
  // total number of days
  const totalDays = WEEK_DAYS * TOTAL_WEEKS;
  // number of days required from previous month
  const numberOfDaysFromPreviousMonth = getDay(startOfCurrentMonth);
  // start date for month-week
  const monthWeeksStartDate = subDays(startOfCurrentMonth, numberOfDaysFromPreviousMonth);
  // generate range for month chuncked by week
  return dateRange(totalDays, monthWeeksStartDate);
};

export default getCalendarMonth;
