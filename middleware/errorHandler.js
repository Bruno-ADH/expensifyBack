const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        name: "Error Handler",
        success: false,
        message: err.message || "Erreur interne au serveur",
        requestId: req.id || "N/A",
    });
}

module.exports = errorHandler;