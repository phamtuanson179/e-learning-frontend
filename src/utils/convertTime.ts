//11111=> 12/6/2020 - user for show data
export const convertTimestampToDateString = (miliseconds: number) => {
  if (!miliseconds) return '';
  else {
    const date = new Date(miliseconds);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }
};

//11111=> 12/6/2020 - user for datepicker
export const convertTimestampToDate = (miliseconds: number) => {
  if (!miliseconds) return '';
  else {
    const date = new Date(miliseconds);
    return date;
  }
};

// 111111 => 12:30:20-12/6/2020
export const convertTimestampToFullDate = (miliseconds: number) => {
  if (!miliseconds) return '';
  else {
    const date = new Date(miliseconds);
    return `${
      date.getHours() == 0
        ? '00'
        : date.getHours() < 10
        ? '0' + date.getHours()
        : date.getHours()
    }:${
      date.getMinutes() == 0
        ? '00'
        : date.getMinutes() < 10
        ? '0' + date.getMinutes()
        : date.getMinutes()
    }:${
      date.getSeconds() == 0
        ? '00'
        : date.getSeconds() < 10
        ? '0' + date.getSeconds()
        : date.getSeconds()
    } - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
};
