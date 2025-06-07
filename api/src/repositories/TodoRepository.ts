import prisma from "../config/db";
import { Status, Priority, Prisma } from "@prisma/client";
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
        include: {
          categories: {
            include: {
              Category: true,
            },
          },
        },
      }),
    ]);

    return {
      data,
      meta: calculatePagination(total, page, limit),
    };
  }

  static async getTodo(id: string, userId: string): Promise<TodoData | null> {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      include: {
        categories: {
          include: {
            Category: true,
          },
        },
      },
    });
    return todo;
  }

  static async createTodo(
    data: CreateTodoData & { userId: string }
  ): Promise<TodoData> {
    const { category_ids, ...todoData } = data;

    return await prisma.todo.create({
      data: {
        ...todoData,
        categories: {
          create: category_ids.map((categoryId) => ({
            categoryId,
          })),
        },
      },
      include: {
        categories: {
          include: {
            Category: true,
          },
        },
      },
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
      include: {
        categories: {
          include: {
            Category: true,
          },
        },
      },
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
        deletedAt: null,
      },
      data: {
        status,
      },
      include: {
        categories: {
          include: {
            Category: true,
          },
        },
      },
    });
  }

  static async deleteTodo(id: string, userId: string): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        categories: {
          include: {
            Category: true,
          },
        },
      },
    });
  }

  static async searchTodos(
    query: string,
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResponse<TodoData>> {
    const { page, limit, sort, order } = options;
    const skip = (page - 1) * limit;

    const where: Prisma.TodoWhereInput = {
      AND: [
        {
          OR: [
            {
              title: {
                contains: query,
              },
            },
            {
              description: {
                contains: query,
              },
            },
          ],
        },
        {
          userId,
        },
      ],
      deletedAt: null,
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
        include: {
          categories: {
            include: {
              Category: true,
            },
          },
        },
      }),
    ]);

    return {
      data,
      meta: calculatePagination(total, page, limit),
    };
  }

  static async getTodoStats(userId: string): Promise<{
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
  }> {
    const stats = await prisma.todo.groupBy({
      by: ["status"],
      where: {
        userId,
        deletedAt: null,
      },
      _count: {
        status: true,
      },
    });

    return {
      total: stats.reduce((acc, curr) => acc + curr._count.status, 0),
      completed:
        stats.find((s) => s.status === "COMPLETED")?._count.status || 0,
      pending: stats.find((s) => s.status === "PENDING")?._count.status || 0,
      inProgress:
        stats.find((s) => s.status === "IN_PROGRESS")?._count.status || 0,
    };
  }

  static async getPriorityStats(userId: string): Promise<{
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  }> {
    const stats = await prisma.todo.groupBy({
      by: ["priority"],
      where: {
        userId,
        deletedAt: null,
      },
      _count: {
        priority: true,
      },
    });

    return {
      HIGH: stats.find((s) => s.priority === "HIGH")?._count.priority || 0,
      MEDIUM: stats.find((s) => s.priority === "MEDIUM")?._count.priority || 0,
      LOW: stats.find((s) => s.priority === "LOW")?._count.priority || 0,
    };
  }

  static async getTodoCategories(userId: string, id: string) {
    return await prisma.todo.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      include: {
        categories: {
          include: {
            Category: true,
          },
        },
      },
    });
  }

  static async getTodoCategory(id: string, categoryId: string) {
    return await prisma.todoCategory.findUnique({
      where: {
        todoId_categoryId: {
          todoId: id,
          categoryId,
        },
      },
    });
  }

  static async createTodoCategory(id: string, categoryId: string) {
    return await prisma.todoCategory.create({
      data: {
        todoId: id,
        categoryId,
      },
    });
  }

  static async deleteTodoCategory(todoId: string, categoryId: string) {
    return await prisma.todoCategory.delete({
      where: {
        todoId_categoryId: {
          todoId,
          categoryId,
        },
      },
    });
  }
}
