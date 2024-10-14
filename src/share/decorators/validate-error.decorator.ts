import { ValidationError } from 'class-validator';

/**
 * handles messages of error
 * @param errors message of error
 * @returns
 */
export function getMessageError(errors: ValidationError[]): string {
  return errors.reduce((errMsg, err) => {
    if (err.constraints) {
      errMsg += Object.values(err.constraints)[0] + '\n';
    }
    if (err.children.length) {
      errMsg += err.children
        .map((i) => Object.values(i.children[0].constraints)[0])
        .join('\n');
    }
    return errMsg;
  }, '');
}
