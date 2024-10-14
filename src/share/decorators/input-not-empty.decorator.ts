import { registerDecorator, ValidationOptions } from 'class-validator';
import { ErrorMessage } from '../constants/common.constants';

/**
 * validation values not empty
 * @param validationOptions data input options
 * @returns
 */
export function IsNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmpty',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any) {
          if (value !== 0 && !value) {
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
