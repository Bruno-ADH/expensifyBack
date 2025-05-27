const logger = (req, res, next) => {
    const {url, method} = req
    const date = new Date();
    console.log(`[${method}] [${url}] [${date.toLocaleString("fr")}] [Request ID: ${req.id || 'N/A'}]`);
    next()
}

module.exports = logger;