const handleMongooseError = (error, data, next) => {
    //console.log('Error bookSchema', error);
    const {name, code} = error;
    // console.log(name); // MongoServerError // ValidationError
    // console.log(code); // 11000  // undefined
    const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    //error.status = 400;
    error.status = status;
    next()
};

module.exports = handleMongooseError;