const mongoose = require("mongoose");

module.exports = async () => {
    try {
        let connectString = process.env.DB_URL;
        if (process.env.DEV == "true") {
            console.log('Development mode');
            connectString = process.env.DB_URL_DEV;
        }
        console.log(connectString);   
        await mongoose.connect(connectString, {
            useNewUrlParser: true,
        });
        console.log('Database connected')
    } catch (error) {
        console.log('Database connectivity error', error);
        console.log("error",  error)
        throw new Error(error);

    }
}  