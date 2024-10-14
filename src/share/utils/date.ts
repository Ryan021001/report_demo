import * as moment from 'moment';
/**
 * The function takes a Date object and returns a new Date object representing the same date and time, but in the local time zone.
 * @param date Date of local time input
 * @returns
 */
export function convertLocalDate(date: Date) {
  return moment(new Date(date)).toDate();
}
