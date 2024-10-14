import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  /**
   * handle terminal distance
   * @param values data input
   * @returns
   */
  private trim(values) {
    Object.keys(values).forEach((key) => {
      if (key !== 'password') {
        if (this.isObj(values[key])) {
          values[key] = this.trim(values[key]);
        } else {
          if (typeof values[key] === 'string') {
            values[key] = values[key].trim();
          }
        }
      }
    });
    return values;
  }

  /**
   * Changer data output
   * @param values data input
   * @param metadata
   * @returns
   */
  transform(values: any, metadata: ArgumentMetadata) {
    if (this.isObj(values)) {
      return this.trim(values);
    }
    return values;
  }
}
