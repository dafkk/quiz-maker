import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map, of, tap } from 'rxjs';
import { Question } from '../shared/quiz.model';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  questionsAnswered$: Observable<Question[]> = of([]);
  answersSubject$: BehaviorSubject<Question> = new BehaviorSubject(
    this.createDefaultQuestion()
  );
  allQuestionsSelected: boolean = false;
  questionsAnswered: Question[] = [];

  constructor(private router: Router, private quizService: QuizService) {}

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
      })
    );
  }

  submit() {
    // this.quizService.updateQuestionsAnswered(this.questionsAnswered$);
    this.router.navigate(['/result']);
  }

  createDefaultQuestion(): Question {
    return {
      question: '',
      correct_answer: '',
      incorrect_answers: [],
      selected: '',
    };
  }
}
