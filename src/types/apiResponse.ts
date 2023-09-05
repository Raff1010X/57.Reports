export interface IApiResponse {
    status: 'success' | 'fail' | 'error';
    message: string;
    data?: {}
}

export enum Codes {
    OK = 200,
    Created = 201,
    NotModified = 304,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    InternalServerError = 500,
}