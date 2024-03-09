const jwt = require("jsonwebtoken");
const { serverResponse, adminRoles } = require ("../constants/index");



const authenticateToken =async (req, res, next) => {
  const response = serverResponse.defaultResponse;
  console.log("authenticateToken is running")

  try {

    // console.log(req.body)
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split("Bearer")[1]?.trim();

    if (!token) {
      // If there is no token, return an unauthorized response
      throw new Error("Unauthorized - No token provided");
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "secretKey");

    const decodedForHeaders = jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
    })

    // Continue to the next middleware or route handler
    return next();
  } catch (error) {
    // If the token is invalid, return an unauthorized response
    console.log(error);
    response.status = 401;
    response.message = "unauthorized request: error validating token";
    return res.status(response.status).send(response);
  }
};

const AdminAuthenticateToken = async (req, res, next) => {
  // Get the token from the Authorization header

  try {
      
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split("Bearer")[1]?.trim();
      if (
        !req.headers.authorization &&
        (authHeader && authHeader.split("Bearer")[1]?.trim())
      ) {
        // If there is no token, return an unauthorized response
        throw new Error(serverResponse.requesteError.MISSING_TOKEN);
      }
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "secretKey");

    // Continue to the next middleware or route handler
    if (!adminRoles.includes(decoded.role)) {
      throw new Error(serverResponse.requesteError.USER_NOT_AUTHORIZED);
    }

    
    return next();
  } catch (error) {
    // If the token is invalid, return an unauthorized response
    console.log(error);
    response.status = 401;
    response.message = "unauthorized request: unauthorized request";
}
return res.status(response.status).send(response);
};

module.exports = {authenticateToken, AdminAuthenticateToken};
