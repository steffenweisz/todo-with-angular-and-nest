import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './interfaces/todo.interface';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() todo: Omit<Todo, 'id'>): Todo {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() todo: Partial<Todo>): Todo {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.todoService.delete(id);
  }
}
