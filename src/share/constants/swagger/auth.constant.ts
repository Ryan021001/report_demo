import { HttpStatus } from '@nestjs/common';
import { swaggerSchemaExample } from '../../utils/swagger-schema';
import { AppStatus } from '../common.constants';

export const DEFAULT_DUID = 1;

export const AUTH_SWAGGER_RESPONSE = {
  LOGIN_SUCCESS: swaggerSchemaExample(
    {
      message: AppStatus.StatusCode200,
      data: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        accessTokenExpire: 86400,
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        refreshTokenExpire: 86400,
      },
    },
    'login success',
  ),

  LOGOUT_SUCCESS: swaggerSchemaExample(
    {
      message: AppStatus.StatusCode200,
    },
    'logout success',
  ),

  REFRESH_TOKEN_SUCCESS: swaggerSchemaExample(
    {
      message: 'success',
      data: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        accessTokenExpire: 86400,
      },
    },
    'refresh token success',
  ),

  RESPONSE_OK: swaggerSchemaExample(
    {
      message: 'string',
      statusCode: HttpStatus.OK,
    },
    '200 OK',
  ),

  REGISTER_SUCCESS: swaggerSchemaExample(
    {
      data: {
        user: 'object',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        accessTokenExpire: 86400,
      },
      statusCode: HttpStatus.CREATED,
    },
    'register success',
  ),
  LOGIN_FAIL: swaggerSchemaExample(
    {
      message: 'User not found, disabled or locked',
      statusCode: HttpStatus.NOT_FOUND,
    },
    'User not found',
  ),

  REGISTER_FAIL: swaggerSchemaExample(
    {
      message: 'User not found, disabled or locked',
      statusCode: HttpStatus.NOT_FOUND,
    },
    'Not found',
  ),
  BAD_REQUEST_EXCEPTION: swaggerSchemaExample(
    {
      message: 'bad exception',
      statusCode: HttpStatus.BAD_REQUEST,
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

  METHOD_NOT_ALLOWED: swaggerSchemaExample(
    {
      message: 'please check your request method',
      statusCode: HttpStatus.METHOD_NOT_ALLOWED,
    },
    'Method Not Allowed',
  ),
  NOT_FOUND_EXCEPTION: swaggerSchemaExample(
    {
      message: 'not found exception',
      statusCode: HttpStatus.NOT_FOUND,
    },
    'not found exception',
  ),
  INTERNAL_SERVER_EXCEPTION: swaggerSchemaExample(
    {
      message: 'internal server error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    'internal server error',
  ),
};
