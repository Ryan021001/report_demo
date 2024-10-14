/**
 * transforms date to number
 * @param date date input
 * @returns
 */
export const convertDateToNumber = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};
