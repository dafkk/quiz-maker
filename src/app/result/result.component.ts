import { Component } from '@angular/core';
import { Question } from '../shared/quiz.model';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  questionsAnswered: Question[] = [];
  correctAnswers: Question[] = [];
  finalResult!: string;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.questionsAnswered = this.quizService.getQuestionsAnswered();
    this.correctAnswers = this.questionsAnswered.filter(
      (question) => question.correct_answer === question.selected
    );
    this.finalResult = `You scored ${this.correctAnswers.length} out of ${this.questionsAnswered.length}`;
    console.log(this.questionsAnswered);
    console.log(this.correctAnswers);
  }
}
