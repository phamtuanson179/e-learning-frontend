export const convertStringToCurrency = (money: any) => {
  if (money) {
    return parseInt(money).toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
  }
  return 0;
};
export const splitStringAfterLastDot = (str: string) => {
  if (str) {
    const index = str.lastIndexOf('.');
    return {
      before: str.slice(0, index),
      after: str.slice(index + 1),
    };
  }
  return '';
};
