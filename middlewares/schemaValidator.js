const validator = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if(error) {
        const { details } = error; 
        const message = details.map(i => i.message).join(',');
        console.log("error", message); 

        next({ status: 422, message: message.split('\"').join("")});
    } else {
        next();
    }
}

module.exports = validator;