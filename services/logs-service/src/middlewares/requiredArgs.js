module.exports = (requiredArgs) => {
    return (req, res, next) => {
        const missingArgs = [];

        requiredArgs.forEach((arg) => {
            if (!req.query[arg]) {
                missingArgs.push(arg);
            }
        });

        if (missingArgs.length > 0) {
            return res.status(400).json({
                "error": `Les arguments suivants sont requis : ${missingArgs.join(', ')}`,
            });
        }
        next();
    };
};