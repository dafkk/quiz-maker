import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of, tap } from 'rxjs';
import { Question } from '../shared/quiz.model';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  questionsAnswered$: Observable<Question[]> = of([]);
  answersSubject$: BehaviorSubject<Question> = new BehaviorSubject(
    this.quizService.createDefaultQuestion()
  );
  allQuestionsSelected = false;
  isListEmpty = true;
  questionsAnswered: Question[] = [];

  constructor(private quizService: QuizService) {}

  addQuestions(questions: Observable<Question[]>) {
    this.questionsAnswered$ = combineLatest([
      questions,
      this.answersSubject$,
    ]).pipe(
      map(([questions, answeredQuestion]) =>
        questions.map((item) =>
          item.question === answeredQuestion.question ? answeredQuestion : item
        )
      ),
      tap((updatedQuestions) => {
        this.quizService.updateQuestionsAnswered(updatedQuestions);
        this.allQuestionsSelected = updatedQuestions.every((q) => q.selected);
        this.isListEmpty = updatedQuestions.length === 0;
      })
    );
  }
}
