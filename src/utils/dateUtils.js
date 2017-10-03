import splitEvery from 'ramda/src/splitEvery';
import addDays from 'date-fns/add_days';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import startOfMonth from 'date-fns/start_of_month';
import addMonths from 'date-fns/add_months';
import subMonths from 'date-fns/sub_months';
import startOfWeek from 'date-fns/start_of_week';
import addWeeks from 'date-fns/add_weeks';
import subWeeks from 'date-fns/sub_weeks';
import parse from 'date-fns/parse';
import isSameDay from 'date-fns/is_same_day';

import { WEEK_DAYS } from '../utils/constants';

export const dateRange = (numberOfDays, startDate) =>
  Array(numberOfDays)
    .fill(startDate)
    .map((date, index) => addDays(date, index));

export const isWithinDateRange = (dates, date) =>
  dates.filter(monthDate => isSameDay(parse(date), monthDate)).length > 0;

export const getCurrentMonth = getMonth;

export const getCurrentYear = getYear;

export const startOfCurrentMonth = date => startOfMonth(parse(date));

export const getNextMonthDate = date => startOfMonth(addMonths(date, 1));

export const getPreviousMonthDate = date => startOfMonth(subMonths(date, 1));

export const startOfCurrentWeek = date => startOfWeek(parse(date));

export const getNextWeekDate = date => startOfWeek(addWeeks(date, 1));

export const getPreviousWeekDate = date => startOfWeek(subWeeks(date, 1));

export const splitIntoWeeks = splitEvery(WEEK_DAYS);
