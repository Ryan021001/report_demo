import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// ========= TYPE =========
export enum DefaultPagination {
  PAGE = 1,
  PAGE_SIZE = 100,
}

export enum AppStatus {
  StatusCode200 = 200,
  StatusCode201 = 201,
  StatusCode400 = 400,
  StatusCode401 = 401,
  StatusCode403 = 403,
  StatusCode404 = 404,
  StatusCode405 = 405,
  StatusCode422 = 422,
  StatusCode500 = 500,
}
export const ErrorMessage = {
  BAD_REQUEST: 'Bad Request',
  DO_NOT_PERMISSIONS: 'You do not have permission to access resource!',
  DO_NOT_ACCESS_API: 'You do not have permission to access API',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  DASHBOARD_TYPE_SEARCH_INVALID: 'Dashboard type search invalid!',
  NOT_FOUND: 'Not found, disabled or locked',
  UNAUTHORIZED: 'Unauthorized',
  METHOD_NOT_ALLOWED: 'Method Not Allowed',
  UN_PROCESSABLE_ENTITY: 'Unprocessable entity exception',
};
