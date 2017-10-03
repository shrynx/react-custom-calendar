import React from 'react';
import PropTypes from 'prop-types';

import getCalendarWeek from '../utils/getCalendarWeek';
import {
  getCurrentMonth,
  getCurrentYear,
  getNextWeekDate,
  getPreviousWeekDate,
  isWithinDateRange,
  startOfCurrentWeek,
} from '../utils/dateUtils';
import { mergeEventData, formatDateRange } from '../utils/dateDataUtils';

class CustomWeekCalendar extends React.Component {
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
    displayWeekStartDate: startOfCurrentWeek(this.props.currentDate),
  };

  componentWillReceiveProps({ currentDate }) {
    this.setState(
      ({ displayWeekStartDate }) =>
        (isWithinDateRange(getCalendarWeek(displayWeekStartDate), currentDate)
          ? { currentDate }
          : {
            currentDate,
            displayWeekStartDate: startOfCurrentWeek(currentDate),
          }),
    );
  }

  changeToNextWeek = () => {
    this.setState(({ displayWeekStartDate }) => ({
      displayWeekStartDate: getNextWeekDate(displayWeekStartDate),
    }));
  };

  changeToPreviousWeek = () => {
    this.setState(({ displayWeekStartDate }) => ({
      displayWeekStartDate: getPreviousWeekDate(displayWeekStartDate),
    }));
  };

  render() {
    const { events, children } = this.props;
    const { displayWeekStartDate } = this.state;
    const { changeToNextWeek, changeToPreviousWeek } = this;

    const calendarWeekData = mergeEventData(events)(
      formatDateRange(getCalendarWeek(displayWeekStartDate)),
    );

    const currentMonth = getCurrentMonth(displayWeekStartDate);
    const currentYear = getCurrentYear(displayWeekStartDate);

    return children({
      week: calendarWeekData,
      currentMonth,
      currentYear,
      changeToNextWeek,
      changeToPreviousWeek,
    });
  }
}

export default CustomWeekCalendar;
