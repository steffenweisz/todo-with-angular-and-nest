import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from './interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  // GET all todos
  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // GET a single todo by ID
  getTodoById(id: string): Observable<Todo> {
    return this.http
      .get<Todo>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // POST a new todo (excluding id)
  addTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http
      .post<Todo>(this.apiUrl, todo)
      .pipe(catchError(this.handleError));
  }

  // PUT update an existing todo
  updateTodo(id: string, todo: Partial<Todo>): Observable<Todo> {
    return this.http
      .put<Todo>(`${this.apiUrl}/${id}`, todo)
      .pipe(catchError(this.handleError));
  }

  // DELETE a todo by ID
  deleteTodo(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling logic
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // Log the error (you could also use a logging service)
    console.error(errorMessage);

    // Return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }
}

export type { Todo };
