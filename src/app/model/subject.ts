export interface SubjectCreate {
  name: string;
  alias: string;
  time: number;
  amount_question: number;
  min_correct_question_to_pass: number;
  description?: string;
  generate_exam_type?: string;
}

export interface Subject extends SubjectCreate {
  id: string;
}
