import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";

// Request'in hangi kısmının validate edileceğini belirten enum
export enum ValidationType {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
}

// Validator middleware factory function
export const validate = (
  schema: ZodSchema,
  type: ValidationType = ValidationType.BODY
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Request'in belirtilen kısmını validate et
      const dataToValidate = req[type];
      
      // Zod ile validation yap
      const validatedData = schema.parse(dataToValidate);
      
      // Validate edilmiş veriyi request'e geri ata
      req[type] = validatedData;
      
      next();
    } catch (error) {
      // Validation hatası varsa next'e hata olarak gönder
      // Error handler middleware yakalayacak
      next(error);
    }
  };
};

// Özel validation middleware'leri
export const validateBody = (schema: ZodSchema) => 
  validate(schema, ValidationType.BODY);

export const validateParams = (schema: ZodSchema) => 
  validate(schema, ValidationType.PARAMS);

export const validateQuery = (schema: ZodSchema) => 
  validate(schema, ValidationType.QUERY);

// ID parametresi için özel validator
export const validateId = validate(
  z.object({
    id: z.string().uuid("Geçerli bir UUID formatı gerekli"),
  }),
  ValidationType.PARAMS
);
