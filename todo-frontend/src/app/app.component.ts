import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { authInterceptor } from './interceptors/auth.interceptor';

const routes: Routes = [{ path: '', component: TodosComponent }];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Sample Todo App with Angular and nestjs.';
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]) // Verwende withInterceptors und den funktionalen Interceptor
    ),
  ],
});
