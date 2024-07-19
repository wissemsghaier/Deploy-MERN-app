// middlewares/roleMiddleware.js
const ROLES = {
    "USER": "USER",
    "ADMIN": "ADMIN",
    "SUPERADMIN": "SUPERADMIN",
  };
  
  const isRole = (...roles) => (req, res, next) => {
    console.log('Checking role for user:', req.user); // Log the user object
    const userRole = req.user.role.toUpperCase(); // Convert user role to uppercase
    const role = roles.find(role => role.toUpperCase() === userRole); // Convert roles to uppercase for comparison
    if (!role) {
      console.log('No access:', req.user.role); // Log the role if access is denied
      return res.status(401).json({ message: "No access" });
    }
    next();
  };
  
  module.exports = {
    isRole,
    ROLES
  };
  