export interface CategoryAPIResponse {
  trivia_categories: Category[];
}

export interface QuestionsAPIResponse {
  results: Question[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  selected?: string;
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HIGH = 'high',
}
