import { PrismaClient } from "@prisma/client";
import { Express } from "express";

declare global {
  var prisma: PrismaClient;
  var app: Express;
}
