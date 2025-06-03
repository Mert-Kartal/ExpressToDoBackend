import { TodoRepository } from "../repositories/TodoRepository";
import { CreateTodoData, UpdateTodoData } from "../model/todoType";
export class TodoService {
  static async getTodos() {
    try {
      return await TodoRepository.getTodos();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getTodo(id: string) {
    try {
      const todo = await TodoRepository.getTodo(id);
      if (!todo) {
        throw new Error("Todo not found");
      }
      return todo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async createTodo(data: CreateTodoData) {
    try {
      return await TodoRepository.createTodo(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async updateTodo(id: string, data: UpdateTodoData) {
    try {
      const todo = await TodoRepository.updateTodo(id, data);
      if (!todo) {
        throw new Error("Todo not found");
      }
      return todo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async deleteTodo(id: string) {
    try {
      return await TodoRepository.deleteTodo(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
