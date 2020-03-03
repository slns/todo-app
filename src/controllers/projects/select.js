module.exports = (request, response) => {
    return response.status(200).json({
        "status": true,
        "message": 'GET executed with success!'
    });
}