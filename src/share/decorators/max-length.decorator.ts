import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { ErrorMessage } from '../constants/common.constants';

/**
 * validations values max length input
 * @param max length of characters type number
 * @param validationOptions data input options
 * @returns
 */
export function CustomMaxLength(
  max: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'customMaxLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [max],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (value?.length || 0) <= args.constraints[0];
        },
        defaultMessage() {
          return ErrorMessage.UN_PROCESSABLE_ENTITY;
        },
      },
    });
  };
}
