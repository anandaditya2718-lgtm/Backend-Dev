const responseTimeLogger = (req, res, next) => {
    const startTime = Date.now();

    res.on("finish", () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${responseTime}ms`);
    });

    next();
};

module.exports = responseTimeLogger;
