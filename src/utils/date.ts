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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
