class CustomException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

class InternalServerError extends CustomException {
    constructor(msg) {
        super(msg, 500);
    }
}

class BadRequestError extends CustomException {
    constructor(msg) {
        super(msg, 400);
    }
}

class AccessDeniedError extends CustomException {
    constructor(msg) {
        super(msg, 404);
    }
}

class ForbiddenError extends CustomException {
    constructor(msg) {
        super(msg, 403);
    }
}

class UnauthorizedError extends CustomException {
    constructor(msg) {
        super(msg, 401);
    }
}

module.exports = {
    InternalServerError,
    BadRequestError,
    AccessDeniedError,
    ForbiddenError,
    UnauthorizedError
};
