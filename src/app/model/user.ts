import { SubjectSPT } from "./subject";

export interface UserCreate {
  username: string;
  password: string;
  email: string;
  role: string;
  fullname: string;
  dob: number;
  avatar: string;
  token?: string;
  list_subjects_id?: string[];
}

export interface User extends UserCreate {
  id: string;
}
