import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  create(todo: Omit<Todo, 'id'>): Todo {
    const newTodo = { ...todo, id: uuidv4() };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: string, todo: Partial<Todo>): Todo {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;
    this.todos[index] = { ...this.todos[index], ...todo };
    return this.todos[index];
  }

  delete(id: string): void {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) this.todos.splice(index, 1);
  }
}
