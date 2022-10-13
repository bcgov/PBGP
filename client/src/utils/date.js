import moment from 'moment-timezone';

export const dateToString = (dateObj, keepLocalTime = true, format = 'YYYY/MM/DD') => moment(dateObj).utc(keepLocalTime).format(format);

export const stringToDate = (dateStr, format = 'YYYY/MM/DD') => moment(dateStr, format);

export const addDaysToDate = (dateObj, numberOfDays) => moment(dateObj).add(numberOfDays, 'days');

export const utcToLocalString = (dateObj, format = 'YYYY/MM/DD') => moment.utc(dateObj).local().format(format);
export const cdtToLocalString = (dateObj, format = 'YYYY/MM/DD') => moment.tz(dateObj, 'America/Winnipeg').local().format(format);