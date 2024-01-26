const constants = require("../constants/index");
const User = require("../database/models/userModel"); //userModel
const bcrypt = require("bcryptjs");
const { formatMongoData, checkObjectId } = require("../utilities/formatData");
const jwt = require("jsonwebtoken");

const adminRoles = ["admin1", "admin2", "admin3"];

module.exports.signup = async (req, res) => {
  let response = {
    status: 400,
    message: "",
    data: {},
  };
  try {
    const { firstName, lastName, email, phone, password, nationality, role } =
      req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("already existing user, kindly login with this email");
    }

    encryptedPassword = await bcrypt.hash(
      password,
      process.env.HASH_SALT || 15
    );

    let newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: encryptedPassword,
      nationality: nationality,
      role: role ?? "buyer",
    });

    let result = await newUser.save();
    let formattedData = await formatMongoData(result);

    const token = jwt.sign(
      { id: formattedData.id, role: formatMongoData.role },
      process.env.SECRET_KEY || "secretKey",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    // Return any data you want as a response
    response.status = 400;
    response.message = "User signed up successfully";
    response.data = formattedData;
  } catch (error) {
    response.message = "error message";
    response.error = error.message;
    console.log("something went wrong: controller: signUp user");
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.login = async (req, res) => {
  let response = {
    status: 400,
    message: "",
    data: {},
  };

  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    console.log("existingUser", existingUser);

    if (!existingUser) {
      throw new Error("invalid credentials: user not found");
    }

    const ValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!ValidPassword) {
      throw new Error("invalid credentials: invalid password");
    }

    token = jwt.sign(
      { id: existingUser.id, role: existingUser.role },
      process.env.SECRET_KEY || "secretKey",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    response.status = 200;
    response.message = "user logged in succesfully";
    response.data = await formatMongoData(existingUser);
    response.token = token

  } catch (error) {
    response.message = "error";
    response.error = error.message;
    console.log("something went wrong: controller: login user");
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.updateuser = async (req, res) => {
  let response = {
    status: 400,
    message: "",
    data: {},
  };

  try {
    const userId = req.params.id;
    const updateInfo = req.body;
    const token = req.headers.authorization.split("Bearer")[1].trim();

    checkObjectId(userId);

    const decode = jwt.verify(token, process.env.SECRET_KEY || "secretKey");
    
    //update user profile by user
    //and by admin when role admin1
    if (decode.id != userId && !adminRoles.includes(decode.role)) {
      throw new Error("unauthorized user action");
    }

    //encrypt password before updating password
    if (updateInfo.password) {
      updateInfo.password = await bcrypt.hash(
        updateInfo.password,
        process.env.HASH_SALT || 15
      );
    }

    let user = await User.findByIdAndUpdate({ _id: userId }, updateInfo, {
      new: true,
    });

    if (!user) {
      throw new Error("user not found");
    }

    response.status = 200;
    response.message = "User updated successfully";
    response.data = await formatMongoData(user);

    return formatMongoData(user);
  } catch (error) {
    console.log("something went wrong: controller: update user");
    console.log(error)
    response.message = error.message;
  } finally {
    return res.status(response.status).send(response);
  }
};