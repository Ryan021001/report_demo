import { HttpStatus } from '@nestjs/common';
import { swaggerSchemaExample } from '../../utils/swagger-schema';

export const SWAGGER_RESPONSE = {
  INTERNAL_SERVER_EXCEPTION: swaggerSchemaExample(
    {
      message: 'Internal server error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    'internal server error',
  ),
  NOT_FOUND_EXCEPTION: swaggerSchemaExample(
    {
      message: 'Not found exception',
      statusCode: HttpStatus.NOT_FOUND,
    },
    'not found exception',
  ),
  RESPONSE_OK: swaggerSchemaExample(
    {
      message: 'Success',
      statusCode: HttpStatus.OK,
    },
    '200 OK',
  ),
  BAD_REQUEST_EXCEPTION: swaggerSchemaExample(
    {
      message: 'Bad exception',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    'bad request exception',
  ),

  UN_PROCESSABLE_ENTITY_EXCEPTION: swaggerSchemaExample(
    {
      message: 'Unprocessable entity exception',
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      error: 'Unprocessable Entity',
    },
    'bad request exception',
  ),

  UNAUTHORIZED_EXCEPTION: swaggerSchemaExample(
    {
      message: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED,
    },
    'Unauthorized exception, you need to login again',
  ),
  FORBIDDEN: swaggerSchemaExample(
    {
      message: 'Forbidden',
      statusCode: HttpStatus.FORBIDDEN,
    },
    'You dont have permission to access',
  ),
};
