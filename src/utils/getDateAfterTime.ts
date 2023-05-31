export const getDateAfterSomeSeconds = (oldDate: Date, seconds: number) => {
  const newUTCDate = oldDate.getTime() + seconds * 1000;
  return new Date(newUTCDate);
};

export const getDateAfterSomeHours = (oldDate: Date, hours: number) => {
  const ms = hours * 60 * 60 * 1000;
  const newUTCDate = oldDate.getTime() + ms;
  return new Date(newUTCDate);
};
