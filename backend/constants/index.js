const serverResponse = {
  defaultResponse: {
    status: 400,
    message: "",
    data: {},
  },
  requesteError:{
    USER_NOT_AUTHORIZED:"user not authorized",
    MISSING_TOKEN:"Unauthorized - No token provided",
  },

  USER_ERROR:{
    ALREADY_EXISTING_USER:"already existing user, kindly login with this email",
    NO_USER_FOUND:"invalid credentials: user not found",
    INVALID_PWORD:"invalid credentials: invalid password",
    UNAUTHORIZED_USER_ACTION:"unauthorized user action",
    ALREADY_VERIFIED_USER:"user already verified",
  }

};
const adminRoles = ["adminTier1", "adminTier2", "adminTier3"]

module.exports = {serverResponse, adminRoles}  