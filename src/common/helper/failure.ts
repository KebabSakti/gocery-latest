import { Response } from "express";

class ErrorBase extends Error {
  code?: number;

  constructor(code = 500, message = "Unknown error") {
    super(message);
    this.name = "Internal Error";
    this.code = code;
  }
}

class BadRequest extends ErrorBase {
  constructor(message: string) {
    super(400, message);
    this.name = "Bad Request";
  }
}

class InternalError extends ErrorBase {
  constructor(message = "Terjadi kesalahan pada internal sistem") {
    super(500, message);
    this.name = "Internal Error";
  }
}

class ResourceNotFound extends ErrorBase {
  constructor(message = "Data tidak ditemukan") {
    super(404, message);
    this.name = "Resource not found";
  }
}

class Unauthorized extends ErrorBase {
  constructor(message = "Akses tidak di izinkan") {
    super(401, message);
    this.name = "Unauthorized";
  }
}

class ErrorHandler {
  constructor(res: Response, error: Error) {
    console.log(error);

    let e = new InternalError(error.message);

    if (error instanceof ErrorBase) {
      e = error;
    }

    res.status(e.code!).json(e.message);
  }
}

export {
  BadRequest,
  InternalError,
  ResourceNotFound,
  Unauthorized,
  ErrorHandler,
};
