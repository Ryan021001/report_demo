import { registerDecorator, ValidationOptions } from 'class-validator';
import { ErrorMessage } from '../constants/common.constants';

/**
 * validation array is not empty
 * @param validationOptions data input options
 * @returns
 */
export function IsNotEmptyArray(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmptyArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value.length <= 0) {
            return false;
          }
          return true;
        },
        defaultMessage() {
          return ErrorMessage.UN_PROCESSABLE_ENTITY;
        },
      },
    });
  };
}
