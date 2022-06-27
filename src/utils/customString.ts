import { ROLE } from "constants/role";

export const convertStringToCurrency = (money: any) => {
  if (money) {
    return parseInt(money).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  }
  return 0;
};
export const splitStringAfterLastDot = (str: string) => {
  if (str) {
    const index = str.lastIndexOf(".");
    return {
      before: str.slice(0, index),
      after: str.slice(index + 1),
    };
  }
  return "";
};

export const convert_role_be_to_fe = (role: string) => {
  console.log({ role });
  if (role) {
    let key = Object.keys(ROLE).find((item) => ROLE[item].BE == role);
    console.log({ key });
    return ROLE[key].FE;
  }
  return "";
};
