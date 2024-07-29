"use strict";

var role = function role(requiredRole) {
  return function (req, res, next) {
    if (req.user.role !== requiredRole) {
      return res.status(403).send('Access denied.');
    }

    next();
  };
};

module.exports = role;
//# sourceMappingURL=role.dev.js.map
