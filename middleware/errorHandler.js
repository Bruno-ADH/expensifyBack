const handleError = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Une erreur est survenue" });
};

module.exports = {handleError};