import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Category,
  CategoryAPIResponse,
  Question,
  QuestionsAPIResponse,
} from './quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiURL = 'https://opentdb.com';
  questionsAnsweredSubject$: BehaviorSubject<Question[]> = new BehaviorSubject<
    Question[]
  >([]);

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<CategoryAPIResponse>(`${this.apiURL}/api_category.php`)
      .pipe(map((response) => response.trivia_categories));
  }

  getQuestions(
    category: number,
    difficulty: string,
    numberOfQuestions: number
  ): Observable<Question[]> {
    const url = `${this.apiURL}/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http
      .get<QuestionsAPIResponse>(url)
      .pipe(map((response) => response.results));
  }

  updateQuestionsAnswered(questions: Question[]) {
    this.questionsAnsweredSubject$.next(questions);
  }

  getQuestionsAnswered(): Question[] {
    return this.questionsAnsweredSubject$.getValue();
  }
}
