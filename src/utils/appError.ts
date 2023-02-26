// Custom error class: throw new AppError(status, message);
class AppError extends Error {
    status: number;
    constructor(status: number, message: string | undefined) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor); // this is to be able to catch the error in the catch block
    }
}

export default AppError;
