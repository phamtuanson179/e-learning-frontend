import { ROLE } from "constants/role";

export const list_roles = () => {
  const list = [];
  Object.keys(ROLE).forEach((item) => {
    list.push(ROLE[item]);
  });
  return list;
};
