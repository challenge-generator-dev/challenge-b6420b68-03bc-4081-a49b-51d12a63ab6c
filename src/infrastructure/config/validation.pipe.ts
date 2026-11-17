import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class ValidationError extends Error {
  constructor(
    public readonly property: string,
    public readonly constraints: Record<string, string>
  ) {
    super(`Validation failed on property: ${property}`);
    this.name = 'ValidationError';
  }
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const validationErrors: ValidationError[] = errors.map(error => 
        new ValidationError(error.property, error.constraints || {})
      );
      
      const errorInfo = validationErrors.map(err => ({
        property: err.property,
        constraints: err.constraints
      }));
      
      return { validationErrors: errorInfo, isValid: false };
    }

    return { ...value, isValid: true };
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}