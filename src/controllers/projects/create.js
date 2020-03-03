module.exports = (request, response) => {
    const { body } = request;
    return response.status(201).json({
        "status": true,
        "message": 'POST executed with success!',
        "data": body
    });
}