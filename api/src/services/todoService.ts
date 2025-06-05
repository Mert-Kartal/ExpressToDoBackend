import { TodoRepository } from "../repositories/todoRepository";
import { Status } from "@prisma/client";
import { CreateTodoData, UpdateTodoData } from "../model/todoType";
import { AppError } from "../utils/AppError";

export class TodoService {
  //refactor to get only user's todos
  static async getTodos() {
    return await TodoRepository.getTodos();
  }

  static async getTodo(id: string) {
    const todo = await TodoRepository.getTodo(id);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    return todo;
  }

  static async createTodo(data: CreateTodoData) {
    return await TodoRepository.createTodo(data);
  }

  static async updateTodo(id: string, data: UpdateTodoData) {
    const todo = await TodoRepository.updateTodo(id, data);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    return todo;
  }

  static async updateTodoStatus(id: string, status: Status) {
    const todo = await TodoRepository.updateTodoStatus(id, status);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    return todo;
  }

  static async deleteTodo(id: string) {
    const result = await TodoRepository.deleteTodo(id);
    if (!result) {
      throw new AppError("Todo not found", 404);
    }
    return result;
  }

  static async searchTodos(query: string) {
    return await TodoRepository.searchTodos(query);
  }

  static async getTodoStats() {
    return await TodoRepository.getTodoStats();
  }

  static async getPriorityStats() {
    return await TodoRepository.getPriorityStats();
  }
}
