export const notFound = (req, res, next) => {
    res.statusCode = 404;
    const error = Error(`Not found ${req.originalUrl}`);
    next(error);
}



export const errorHandler = async(err, req, res, next) => {
    let statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    let message = err.message;

    res.status(statusCode).json({
        message: message,
        stack: process.env.ENVIRONMENT === 'development' ? err.stack : null, 
    })
}