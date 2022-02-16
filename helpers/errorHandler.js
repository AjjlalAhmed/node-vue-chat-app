// Helper function

// This function send response to user
const generateErrorResponse = (message, status, res) => {
    res.send({
        payload: {
            error: true,
            message: message,
            status: status,
        },
    });
};

// This function handle errors
const errorhandler = (res, error) => {
    switch (error) {
        case "internal server error":
            generateErrorResponse(error, 501, res);
            break;
        case "user credentials is missing":
            generateErrorResponse(error, 401, res);
            break;
        case "invalid email":
            generateErrorResponse(error, 401, res);
            break;
        case "user already exist":
            generateErrorResponse(error, 401, res);
            break;
        case "user does not exist":
            generateErrorResponse(error, 401, res);
            break;
        case "password is not valid":
            generateErrorResponse(error, 401, res);
            break;
        case "invalid token":
            generateErrorResponse(error, 401, res);
            break;
        default:
            generateErrorResponse(error, 501, res);
    }
};

// Exporting helper fucntion
module.exports = errorhandler;