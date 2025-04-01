module.exports = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = [];

        requiredFields.forEach((field) => {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                "error": `Les champs suivants sont requis : ${missingFields.join(', ')}`,
            });
        }
        next();
    };
};