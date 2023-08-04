import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category, Difficulty, Question } from '../shared/quiz.model';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent {
  categoryList$: Observable<Category[]>;
  difficultyList: string[] = Object.values(Difficulty);
  quizForm = new FormGroup({
    category: new FormControl(),
    difficulty: new FormControl(),
  });

  @Output() getQuestions: EventEmitter<Observable<Question[]>> =
    new EventEmitter();

  constructor(private quizService: QuizService) {
    this.categoryList$ = this.quizService.getCategories();
  }

  create() {
    const category = this.quizForm.value.category;
    const difficulty = this.quizForm.value.difficulty;

    this.getQuestions.emit(
      this.quizService.getQuestions(category, difficulty, 5)
    );
  }
}
