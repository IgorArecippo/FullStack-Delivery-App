const errorStatus = {
    INVALID_FIELDS: 400,
    NOT_FOUND: 404,
};

const errorMessages = {
    NOT_FOUND: 'Not Found',
    INVALID_FIELDS: 'Invalid Fields',
};

const customError = (status, message) => ({ status, message });

module.exports = {
    errorStatus,
    errorMessages,
    customError,
};