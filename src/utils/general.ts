import { SubjectSPT } from "app/model/subject";

export const search_subject_by_id = (subject_arr: SubjectSPT[], id: string) =>
  subject_arr.find((item) => item.id == id);
