const constants = require("../constants/index");
const User = require("../database/models/userModel"); //userModel
const bcrypt = require("bcryptjs");
const { formatMongoData, checkObjectId } = require("../utilities/formatData");
const jwt = require("jsonwebtoken");
const nodemailerUtils = require("../utilities/nodemailer");

// const sentEmail = nodemailerUtils.sendEmail({
//   subject: "Test",
//   text: "I am sending an email from nodemailer!",
//   to: "epidnugotaiwo02@gmail.com",
//   from: process.env.EMAIL,
// });

// const adminRoles = ["admin1", "admin2", "admin3"];

const serverResponse = constants.serverResponse;
const adminRoles = constants.adminRoles;

module.exports.signup = async (req, res) => {
  let response = {
    status: 400,
    message: "",
    data: {},
  };
  try {
    const { firstName, lastName, email, phone, password, nationality } =
      req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error(serverResponse.USER_ERROR.ALREADY_EXISTING_USER);
    }

    salt = bcrypt.genSaltSync(parseInt(process.env.HASH_SALT));
    encryptedPassword = bcrypt.hashSync(password, salt || 15);

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

    //set token as authorization header and cookie for testing and learning only, I would remove one later
    res.set('Authorization', `Bearer ${token}`);
    res.cookie("token", token, { httpOnly: true });
    // Return any data you want as a response
    response.status = 400;
    response.message = "User signed up successfully";
    response.data = formattedData;
    response.token = token;
  } catch (error) {
    response.message = "error message";
    response.error = error.message;
    console.log(error);
    console.log("something went wrong: controller: signUp user");
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.sendVerificationEmail = async (req, res) => {
  let response = serverResponse.defaultResponse;

  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      throw new Error(serverResponse.USER_ERROR.NO_USER_FOUND);
    }

    if (userExist.verified == true) {
      throw new Error(serverResponse.USER_ERROR.ALREADY_VERIFIED_USER);
    }

    // create new token for user
    const token = jwt.sign(
      { id: userExist.id, role: userExist.role },
      process.env.VERIFY_EMAIL_SECRET_KEY ||
        "VERIFY_EMAIL_SECRET_KEY secretKey",
      { expiresIn: "1h" }
    );

    console.log("token:", token);

    // send email and token to user
    const emailResponse = await nodemailerUtils.sendValidationEmail(req, token);

    if (emailResponse) {
      response.status = 200;
      response.message = "User verification mail sent successfully";
      response.data = emailResponse;
    }
  } catch (error) {
    response.message = "error message";
    response.error = error.message;
    console.log(
      "something went wrong: controller: signUp sendinr verification email"
    );
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.verifyEmail = async (req, res) => {
  let response = serverResponse.defaultResponse;

  try {
    const token = req.params.token;

    if (!token) {
      throw new Error(serverResponse.requesteError.MISSING_TOKEN);
    }

    decodedToken = jwt.verify(
      token,
      process.env.VERIFY_EMAIL_SECRET_KEY || "VERIFY_EMAIL_SECRET_KEY secretKey"
    );

    if (!decodedToken) {
      throw new Error(serverResponse.requesteError.USER_NOT_AUTHORIZED);
    }

    //CHANGE IN DB TO VERIFY
    let userId = decodedToken.id;
    let toVerifyUser = await User.findByIdAndUpdate(
      { _id: userId },
      { verified: true },
      {
        new: true,
      }
    );

    response.status = 200;
    response.message = "User verified successfully";
    response.data = await formatMongoData(toVerifyUser);
  } catch (error) {
    response.message = "error message";
    response.error = error.message;
    console.log(error);
    console.log("something went wrong: controller: signUp verification");
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
    console.log("body: ", req.body)
    // console.log("request object",req)
    const { email, password } = req.body;
    console.log("email", email, "password: ", password)

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error(serverResponse.USER_ERROR.NO_USER_FOUND);
    }

    const ValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!ValidPassword) {
      throw new Error(serverResponse.USER_ERROR.INVALID_PWORD);
    }

    token = jwt.sign(
      { id: existingUser.id, role: existingUser.role },
      process.env.SECRET_KEY || "secretKey",
      { expiresIn: "1h" }
    );
      //set token as authorization header and cookie for testing and learning only, I would remove one later
    res.set('Authorization', `Bearer ${token}`);
    res.cookie("token", token, { httpOnly: true });

    response.status = 200;
    response.message = "user logged in succesfully";
    response.data = await formatMongoData(existingUser);
    response.token = token;
  } catch (error) {
    response.message = "error";
    response.error = error.message;
    console.log("error:", error)
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
    checkObjectId(userId);

    const { firstName, lastName, email, phone, password, nationality } =
      req.body;

    const updateInfo = {};

    if (firstName || lastName || email || phone || nationality || password) {
      // Assign properties to newUser only if they exist in req.body
      if (firstName) updateInfo.firstName = firstName;
      if (lastName) updateInfo.lastName = lastName;
      if (email) updateInfo.email = email;
      if (phone) updateInfo.phone = phone;
      if (password) updateInfo.password = password;
      if (nationality) updateInfo.nationality = nationality;
    } else {
      throw new Error("cant update provided field ");
    }

    console.log("updateInfo:", updateInfo);

    const token = req.headers.authorization.split("Bearer")[1].trim();

    const decode = await jwt.verify(
      token,
      process.env.SECRET_KEY || "secretKey"
    );

    //update user profile by user
    //and by admin when role admin1
    if (decode.id != userId && !adminRoles.includes(decode.role)) {
      throw new Error(serverResponse.USER_ERROR.UNAUTHORIZED_USER_ACTION);
    }

    //encrypt password before updating password
    if (updateInfo.password) {
      const saltRounds = (await parseInt(process.env.HASH_SALT)) || 15;
      const salt = await bcrypt.genSaltSync(saltRounds);
      updateInfo.password = await bcrypt.hashSync(updateInfo.password, salt);
    }

    let user = await User.findByIdAndUpdate({ _id: userId }, updateInfo, {
      new: true,
    });

    if (!user) {
      throw new Error(serverResponse.USER_ERROR.NO_USER_FOUND);
    }

    response.status = 200;
    response.message = "User Data updated successfully";
    response.data = await formatMongoData(user);

    return formatMongoData(user);
  } catch (error) {
    console.log("something went wrong: controller: update user");
    console.log(error);
    response.message = error.message;
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.sendforgotPasswordEmail = async (req, res) => {
  let response = serverResponse.defaultResponse;

  try {
    const { email, password1, password2 } = req.body;

    if (password1 !== password2) {
      throw new Error("passwords don't match");
    }
    const existingUser = User.findOne({ email });

    if (!existingUser) {
      throw new Error(serverResponse.USER_ERROR.ALREADY_EXISTING_USER);
    }

    const token = jwt.sign(
      { id: userExist.id, password: password1 },
      process.env.FORGOT_PASSWORD_SECRET_KEY ||
        "FORGOT_PASSWORD_SECRET_KEY secretKey",
      { expiresIn: "1h" }
    );

    // send email and token to user
    const emailResponse = await nodemailerUtils.sendValidationEmail(req, token);

    if (emailResponse) {
      response.status = 200;
      response.message = "PASSWORD RESET mail sent successfully";
      response.data = emailResponse;
    }
  } catch (error) {
    response.message = "error message";
    response.error = error.message;
    console.log(
      "something went wrong: controller: signUp sending forgot password email"
    );
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.verifyForgotEmailPassword = async (req, res) => {
  let response = serverResponse.defaultResponse;

  try {
    const token = req.params.token;

    if (!token) {
      throw new Error(serverResponse.requesteError.MISSING_TOKEN);
    }

    decodedToken = jwt.verify(
      token,
      process.env.FORGOT_PASSWORD_SECRET_KEY ||
        "FORGOT_PASSWORD_SECRET_KEY secretKey"
    );

    if (!decodedToken) {
      throw new Error(serverResponse.requesteError.USER_NOT_AUTHORIZED);
    }

    let updateInfo = {};

    //heck for and encrypt password before saving
    if (decodedToken.password) {
      const saltRounds = parseInt(process.env.HASH_SALT) || 15;
      const salt = bcrypt.genSaltSync(saltRounds);
      updateInfo.password = bcrypt.hashSync(decodedToken.password, salt);
    }

    //CHANGE IN DB TO VERIFY
    let userId = decodedToken.id;
    let toChangePassword = await User.findByIdAndUpdate(
      { _id: userId },
      updateInfo,
      {
        new: true,
      }
    );

    response.status = 200;
    response.message =
      "User password changed  successfully, kindly login with your new password";
    response.data = await formatMongoData(toChangePassword);
  } catch (error) {
    response.message = "error message";
    response.error = error.message;
    console.log(error);
    console.log("something went wrong: controller: verifyForgotEmailPassword");
  } finally {
    return res.status(response.status).send(response);
  }
};

// module.exports.getUserbyid = async (req, res) => {
//   let response = serverResponse.defaultResponse;

//   try {
//     const userId = req.params.id;
//     const userWithProperty = await User.findOne({ email: 'john.doe@example.com' }).populate(
//       "propertyInfo"
//     ).then(async (book) => {
//      return book
//     })
//     .catch(err => {
//       console.error(err);
//       // Handle error
//     });
    
//     // console.log("userWithProperty:", userWithProperty)

//     response.message = "user fetched with property successful1";
//     response.status = 200;
//     response.data = await formatMongoData(userWithProperty);

//   } catch (error) {
//     response.message = "error message";
//     response.data = {};
//     response.error = error.message;
//     console.log(error);
//   } finally {
//     return res.status(response.status).send(response);
//   }
// };
