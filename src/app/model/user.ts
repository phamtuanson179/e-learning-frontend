import { Subject } from "./subject";

export interface UserCreate {
  username: string;
  password: string;
  email: string;
  role: string;
  fullname: string;
  dob: string;
  url_avatar: string;
  token?: string;
  subjects?: Subject[];
}

export interface User extends UserCreate {
  id: string;
}
