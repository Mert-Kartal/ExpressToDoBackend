import prisma from "../config/db";
import { CreateTodoData, UpdateTodoData, TodoData } from "../types/todoType";

export class TodoRepository {
  static async getTodos(): Promise<TodoData[]> {
    try {
      return await prisma.todo.findMany({ where: { deletedAt: null } });
    } catch (error) {
      throw error;
    }
  }

  static async getTodo(id: string): Promise<TodoData | null> {
    try {
      return await prisma.todo.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createTodo(data: CreateTodoData): Promise<TodoData> {
    try {
      return await prisma.todo.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateTodo(id: string, data: UpdateTodoData): Promise<TodoData> {
    try {
      return await prisma.todo.update({
        where: {
          id,
          deletedAt: null,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteTodo(id: string): Promise<TodoData> {
    try {
      return await prisma.todo.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
