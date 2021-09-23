import { Request } from "express";

export as namespace IApp;

export interface Payload {
    [key: string]: any
}

export interface IRequest extends Request {
    [key: string]: any
}

export interface IResponse<T> {
    data?: T,
    type?: string
}

export interface Entity {
    success?: boolean,
    data?: any,
    type?: string
}

export interface Dispatcher {
    httpCode: number,
    statusCode: number,
    message: string,
    data?: Payload
}

export interface PaginationResult {
    next: boolean,
    result: any[],
    page: number,
    total?: number
}