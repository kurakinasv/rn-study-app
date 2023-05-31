const formatHHmmFromDate = (date: Date) => {
  const localeTime = date.toLocaleTimeString();
  const splitted = localeTime.split(':');
  return [splitted[0], splitted[1]].join(':');
};

export default formatHHmmFromDate;
