import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../shared/quiz.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  @Input()
  item!: Question;
  @Output() selectedAnswer: EventEmitter<Question> = new EventEmitter();

  answers: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.answers = this.shuffleArray([
      ...this.item.incorrect_answers,
      this.item.correct_answer,
    ]);
  }

  selectAnswer(answer: string) {
    this.item.selected = answer;
    this.selectedAnswer.emit(this.item);
  }

  isResultPage(): boolean {
    return this.router.url === '/result';
  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
}
