const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  const token = jwt.sign(
    {
      id: id,
      role: role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

module.exports = generateToken;
