import { TodoRepository } from "../repositories/todoRepository";
import { Status, Priority } from "@prisma/client";
import { CreateTodoData, UpdateTodoData } from "../model/todoType";
import { AppError } from "../utils/AppError";
import { CategoryRepository } from "../repositories/categoryRepository";

export class TodoService {
  static async getTodos(
    userId: string,
    options: {
      page: number;
      limit: number;
      sort?: string;
      order?: "asc" | "desc";
      status?: Status;
      priority?: Priority;
    }
  ) {
    return await TodoRepository.getTodos(userId, options);
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
    if (!Object.values(Status).includes(status)) {
      throw new AppError(
        `Invalid status. Allowed values are: ${Object.values(Status).join(
          ", "
        )}`,
        400
      );
    }

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

  static async searchTodos(
    query: string,
    userId: string,
    options: {
      page: number;
      limit: number;
      sort?: string;
      order?: "asc" | "desc";
    }
  ) {
    return await TodoRepository.searchTodos(query, userId, options);
  }

  static async getTodoStats(userId: string) {
    return await TodoRepository.getTodoStats(userId);
  }

  static async getPriorityStats(userId: string) {
    return await TodoRepository.getPriorityStats(userId);
  }

  static async getTodoCategories(todoId: string, userId: string) {
    const todo = await this.getTodo(todoId, userId);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    return await TodoRepository.getTodoCategories(userId, todoId);
  }

  static async createTodoCategory(
    userId: string,
    todoId: string,
    categoryId: string
  ) {
    const todo = await this.getTodo(todoId, userId);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    // Check if category exists
    const category = await CategoryRepository.getCategory(categoryId);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    // Check if relationship already exists
    const existingRelation = await TodoRepository.getTodoCategory(
      todoId,
      categoryId
    );

    if (existingRelation) {
      throw new AppError("This category is already assigned to the todo", 400);
    }

    return await TodoRepository.createTodoCategory(todoId, categoryId);
  }

  static async deleteTodoCategory(
    userId: string,
    todoId: string,
    categoryId: string
  ) {
    const todo = await this.getTodo(todoId, userId);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    // Check if relationship exists
    const existingRelation = await TodoRepository.getTodoCategory(
      todoId,
      categoryId
    );

    if (!existingRelation) {
      throw new AppError("This category is not assigned to the todo", 404);
    }

    return await TodoRepository.deleteTodoCategory(todoId, categoryId);
  }
}
