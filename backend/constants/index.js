const serverResponse = {
  defaultResponse: {
    status: 400,
    message: "",
    data: {},
  },
  requesteError:{
    USER_NOT_AUTHORIZED:"user not authorized",
    MISSING_TOKEN:"Unauthorized - No token provided",
  }

};
const adminRoles = ["adminTier1", "adminTier2", "adminTier3"]

module.exports = {serverResponse, adminRoles}  