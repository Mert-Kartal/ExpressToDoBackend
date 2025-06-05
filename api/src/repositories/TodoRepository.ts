import prisma from "../config/db";
import { Status, Priority } from "@prisma/client";
import { CreateTodoData, UpdateTodoData, TodoData } from "../model/todoType";
import {
  PaginationOptions,
  PaginatedResponse,
  calculatePagination,
} from "../utils/pagination";

export class TodoRepository {
  static async getTodos(
    userId: string,
    options: PaginationOptions & {
      status?: Status;
      priority?: Priority;
    }
  ): Promise<PaginatedResponse<TodoData>> {
    const { page, limit, sort, order, status, priority } = options;
    const skip = (page - 1) * limit;

    const where = {
      userId,
      deletedAt: null,
      ...(status && { status }),
      ...(priority && { priority }),
    };

    const [total, data] = await Promise.all([
      prisma.todo.count({ where }),
      prisma.todo.findMany({
        where,
        skip,
        take: limit,
        ...(sort && {
          orderBy: {
            [sort]: order,
          },
        }),
      }),
    ]);

    return {
      data,
      meta: calculatePagination(total, page, limit),
    };
  }

  static async getTodo(id: string, userId: string): Promise<TodoData | null> {
    return await prisma.todo.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });
  }

  static async createTodo(
    data: CreateTodoData & { userId: string }
  ): Promise<TodoData> {
    return await prisma.todo.create({
      data,
    });
  }

  static async updateTodo(
    id: string,
    data: UpdateTodoData,
    userId: string
  ): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      data,
    });
  }

  static async updateTodoStatus(
    id: string,
    status: Status,
    userId: string
  ): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
        userId,
      },
      data: {
        status,
      },
    });
  }

  static async deleteTodo(id: string, userId: string): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
        userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  static async searchTodos(query: string, userId: string): Promise<TodoData[]> {
    return await prisma.todo.findMany({
      where: {
        AND: [
          {
            title: {
              contains: query,
            },
          },
          {
            userId,
          },
        ],
        deletedAt: null,
      },
    });
  }

  static async getTodoStats(
    userId: string
  ): Promise<{ _count: { status: number } }> {
    return await prisma.todo.aggregate({
      where: {
        userId,
        deletedAt: null,
      },
      _count: {
        status: true,
      },
    });
  }

  static async getPriorityStats(
    userId: string
  ): Promise<{ _count: { priority: number } }> {
    return await prisma.todo.aggregate({
      where: {
        userId,
        deletedAt: null,
      },
      _count: {
        priority: true,
      },
    });
  }
}
