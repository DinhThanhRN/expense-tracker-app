import Expense from '../../interfaces/Expense';

export const groupExpensesWithSameDate = (data: [Expense]) => {
  if (data) {
    const result: any = [];
    const getDate = (date: String) => {
      return date.substring(0, date.indexOf('T')) + 'T00:00:00';
    };
    data.forEach(item => {
      const date = getDate(item.paidAt);
      const index = result.findIndex(
        (element: any) => getDate(element.date) === date,
      );
      if (index === -1) {
        result.push({date, data: [item]});
      } else {
        result[index].data.push(item);
      }
    });
    return result;
  }
  return [];
};

const calcDayPass = (date: string) => {
  const now = Date.now();
  return Math.ceil((new Date(date).getTime() - now) / (24 * 60 * 60 * 1000));
};

export const formatDate = (date: string) => {
  if (calcDayPass(date) === 0) return 'TODAY';
  if (calcDayPass(date) === -1) return 'YESTERDAY';
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

export const formatNumber = (number: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(number);
