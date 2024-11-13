export const getShortDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split('.').map(Number);
  const date = new Date(year, month - 1, day);

  return date;
};
