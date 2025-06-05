import { TodoRepository } from "../repositories/todoRepository";
import { Status } from "@prisma/client";
import { CreateTodoData, UpdateTodoData } from "../model/todoType";
import { AppError } from "../utils/AppError";

export class TodoService {
  static async getTodos(userId: string) {
    return await TodoRepository.getTodos(userId);
  }

  static async getTodo(id: string, userId: string) {
    const todo = await TodoRepository.getTodo(id, userId);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    return todo;
  }

  static async createTodo(data: CreateTodoData, userId: string) {
    return await TodoRepository.createTodo({ ...data, userId });
  }

  static async updateTodo(id: string, data: UpdateTodoData, userId: string) {
    const todo = await TodoRepository.updateTodo(id, data, userId);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    return todo;
  }

  static async updateTodoStatus(id: string, status: Status, userId: string) {
    const todo = await TodoRepository.updateTodoStatus(id, status, userId);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    return todo;
  }

  static async deleteTodo(id: string, userId: string) {
    const result = await TodoRepository.deleteTodo(id, userId);
    if (!result) {
      throw new AppError("Todo not found", 404);
    }
    return result;
  }

  static async searchTodos(query: string, userId: string) {
    return await TodoRepository.searchTodos(query, userId);
  }

  static async getTodoStats(userId: string) {
    return await TodoRepository.getTodoStats(userId);
  }

  static async getPriorityStats(userId: string) {
    return await TodoRepository.getPriorityStats(userId);
  }
}
