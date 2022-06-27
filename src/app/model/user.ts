import { SubjectSPT } from "./subject";

export interface UserCreate {
  username: string;
  password: string;
  email: string;
  role: string;
  fullname: string;
  dob: string;
  avatar: string;
  token?: string;
  list_subjects_id?: SubjectSPT[];
}

export interface User extends UserCreate {
  id: string;
}
