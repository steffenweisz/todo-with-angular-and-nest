import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  addTodo(title: string, description: string): void {
    const newTodo = { title, description, done: false };
    this.todoService
      .addTodo(newTodo)
      .subscribe((todo) => this.todos.push(todo));
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }

  toggleTodoDone(todo: Todo): void {
    const updatedTodo = { ...todo, done: !todo.done };
    this.todoService.updateTodo(todo.id, updatedTodo).subscribe((updated) => {
      const index = this.todos.findIndex((t) => t.id === updated.id);
      this.todos[index] = updated;
    });
  }
}
