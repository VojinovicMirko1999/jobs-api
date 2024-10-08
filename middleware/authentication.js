const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const BEARER_STRING = "Bearer ";
const WHITE_SPACE_STRING = " ";

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(BEARER_STRING)) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(WHITE_SPACE_STRING)[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
