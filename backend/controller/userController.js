const constants = require("../constants/index");
const User = require("../database/models/userModel"); //userModel
const bcrypt = require("bcryptjs");
const { formatMongoData, checkObjectId } = require("../utilities/formatData");
const jwt = require("jsonwebtoken");



module.exports.signup = async ({firstName, lastName, email, phone, password, nationality, role},req, res) => {
    let response = {
        status:400,
        message:"",
        data:{}
    }
    try {

        console.log(req.body)
        const userExist = await User.findOne({email})
        if (userExist) {
            throw new Error("already existing user, kindly login with this email")
        }

        encryptedPassword = await bcrypt.hash(password, 15)

        let newUser = new User({
            firstName:firstName,
            lastName:lastName,
            email:email,
            phone:phone,
            password:encryptedPassword,
            nationality:nationality,
            role:role ?? "buyer"
        })

        let result = await newUser.save();
        let formattedData = await formatMongoData(result)

        const token = jwt.sign({id:formattedData.id, role:formatMongoData.role}, process.env.SECRET_KEY || "secretKey", {expiresIn:"1h"} )

        res.cookie('token', token, { httpOnly: true });

        // Return any data you want as a response
        response.status=400
        response.message="User signed up successfully"
        response.data=formattedData
        return res.status(response.status).send(response);

    } catch (error) {
        response.message =""
        response.error = error.message
        console.log("something went wrong: Service: signUp user");
        return res.status(response.status).send(response);
}
}