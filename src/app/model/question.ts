import { SubjectSPT } from "./subject";

export interface Answer {
  content: string;
  is_correct: boolean;
  url_file?: any;
}

export interface QuestionCreate {
  type: number;
  title: string;
  subject: SubjectSPT;
  url_file: any;
  anwsers: Answer[];
}

export interface Question extends QuestionCreate {
  id: string;
}
