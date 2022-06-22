export interface SubjectSPTCreate {
  name: string;
  alias: string;
  time: number;
  amount_question: number;
  min_correct_question_to_pass: number;
  description?: string;
  generate_exam_type?: string;
  avatar?: string;
}

export interface SubjectSPT extends SubjectSPTCreate {
  id: string;
}
