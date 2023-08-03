import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { QuizService } from './shared/quiz.service';
@NgModule({
  declarations: [
    AppComponent,
    CreateQuizComponent,
    QuizComponent,
    QuestionComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [QuizService],
  bootstrap: [AppComponent],
})
export class AppModule {}
