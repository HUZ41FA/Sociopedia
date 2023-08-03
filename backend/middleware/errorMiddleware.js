export const notFound = (req, res, next) => {
    
}



export const errorHandler = async(err, req, res, next) => {
    let statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    let message = err.message;

    res.status(statusCode).json({
        message: message,
        stack: process.env.ENVIRONMENT === 'development' ? err.stack : null, 
    })
}