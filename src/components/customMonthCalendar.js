import React from 'react';
import PropTypes from 'prop-types';

import getCalendarMonth from '../utils/getCalendarMonth';
import {
  getCurrentMonth,
  getCurrentYear,
  getNextMonthDate,
  getPreviousMonthDate,
  startOfCurrentMonth,
  isWithinDateRange,
  splitIntoWeeks,
} from '../utils/dateUtils';
import { mergeEventData, formatDateRange } from '../utils/dateDataUtils';

class CustomMonthCalendar extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    currentDate: PropTypes.instanceOf(Date).isRequired,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.any.isRequired,
        data: PropTypes.any.isRequired,
      }).isRequired,
    ),
  };

  static defaultProps = {
    events: [],
  };

  state = {
    currentDate: this.props.currentDate,
    displayMonthStartDate: startOfCurrentMonth(this.props.currentDate),
  };

  componentWillReceiveProps({ currentDate }) {
    this.setState(
      ({ displayMonthStartDate }) =>
        (isWithinDateRange(getCalendarMonth(displayMonthStartDate), currentDate)
          ? { currentDate }
          : {
            currentDate,
            displayMonthStartDate: startOfCurrentMonth(currentDate),
          }),
    );
  }

  changeToNextMonth = () => {
    this.setState(({ displayMonthStartDate }) => ({
      displayMonthStartDate: getNextMonthDate(displayMonthStartDate),
    }));
  };

  changeToPreviousMonth = () => {
    this.setState(({ displayMonthStartDate }) => ({
      displayMonthStartDate: getPreviousMonthDate(displayMonthStartDate),
    }));
  };

  render() {
    const { events, children } = this.props;
    const { displayMonthStartDate } = this.state;
    const { changeToNextMonth, changeToPreviousMonth } = this;

    const calendarMonthData = splitIntoWeeks(
      mergeEventData(events)(formatDateRange(getCalendarMonth(displayMonthStartDate))),
    );

    const currentMonth = getCurrentMonth(displayMonthStartDate);
    const currentYear = getCurrentYear(displayMonthStartDate);

    return children({
      weeks: calendarMonthData,
      currentMonth,
      currentYear,
      changeToNextMonth,
      changeToPreviousMonth,
    });
  }
}

export default CustomMonthCalendar;
