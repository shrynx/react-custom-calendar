import groupBy from 'ramda/src/groupBy';
import prop from 'ramda/src/prop';
import toPairs from 'ramda/src/toPairs';
import map from 'ramda/src/map';
import merge from 'ramda/src/merge';
import compose from 'ramda/src/compose';
import ifElse from 'ramda/src/ifElse';
import has from 'ramda/src/has';
import head from 'ramda/src/head';
import startOfDay from 'date-fns/start_of_day';
import parse from 'date-fns/parse';
import getDate from 'date-fns/get_date';
import getDay from 'date-fns/get_day';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';

const transformDateData = ([date, dateData]) => ({
  date: startOfDay(parse(date)),
  data: map(prop('data'), dateData),
});

const groupEventsByDates = compose(
  groupBy(prop('date')),
  map(transformDateData),
  toPairs,
  groupBy(prop('date')),
);

const checkIfDateExists = ({ date }) =>
  ifElse(has(date), compose(head, prop(date)), () => ({ date, data: [] }));

export const mergeEventData = (events = []) =>
  map(dateObj => merge(dateObj, checkIfDateExists(dateObj)(groupEventsByDates(events))));

const formatDate = date => ({
  dayOfWeek: getDay(date),
  day: getDate(date),
  month: getMonth(date),
  year: getYear(date),
  date,
});

export const formatDateRange = map(formatDate);
