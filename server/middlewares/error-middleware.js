const errorMiddleware = (err, req,res, ) =>{
    const status = err.status | 500;
    const message = err.message | "BACKEND ERROR"
    const extraDetails = err.extraDetails | "error from Backend";

    return res.status(status).json({message, extraDetails})
}

module.exports = errorMiddleware;