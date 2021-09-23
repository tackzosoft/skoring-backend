
export const responses = {
    200: {
      type: 'success',
      statusCode: 200,
      status: 'ok',
      message: 'The request has succeeded.'
    },
    204: {
      type: 'success',
      statusCode: 204,
      status: 'No Content',
      message: 'No response body to send.'
    },
    400: {
      type: 'error',
      statusCode: 400,
      status: 'Bad Request',
    },
    401: {
      type: 'error',
      statusCode: 401,
      status: 'Unauthorized',
      message: 'Authentication credentials are missing or invalid.'
    },
    403: {
      type: 'error',
      statusCode: 403,
      status: 'Forbidden',
      message: 'The server understood the request but refuses to authorize it.'
    },
    404: {
      type: 'error',
      statusCode: 404,
      status: 'Not Found',
      message: 'The requested URL or Resource is not found.'
    },
    405: {
      type: 'error',
      statusCode: 405,
      status: 'Method Not Allowed',
      message: 'The requested method is not allowed.'
    },
    406:{
      type: 'error',
      statusCode: 406,
      status: 'Not Acceptable',
      message: 'The request has missing file.'
    },
    415: {
      type: 'error',
      statusCode: 415,
      status: 'Unsupported Media Type',
      message: 'The supported media types are JPG,JPEG,PNG.'
    },
    500: {
      type: 'error',
      statusCode: 500,
      status: 'Internal Server Error',
      message: 'The server encountered an unexpected condition that prevented it from fulfilling the request.'
    }
  };
  
  export const ERROR_MESSAGES = {
    MISSING: "One or more required parameters are missing.",
    INVALID_LOGIN: "Invalid login credentials.",
    INVALID_TOKEN: "Invalid or expired authorization token."
  };