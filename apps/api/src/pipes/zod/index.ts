import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
      try {
        return this.schema.parse(value);
      } catch (error) {
        const err: ZodError = error
        throw new BadRequestException({
          errors: err.flatten().fieldErrors,
          title: "Validation failed",
          statusCode: 400
        });
      }
  }
}