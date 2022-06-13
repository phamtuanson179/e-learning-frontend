import { SubjectSPT } from "./subject";

export interface UserCreate {
  username: string;
  password: string;
  email: string;
  role: string;
  fullname: string;
  dob: string;
  url_avatar: string;
  token?: string;
  subjects?: SubjectSPT[];
}

export interface User extends UserCreate {
  id: string;
}
