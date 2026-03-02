import Activity from "../models/Activity.js";

export const logActivity = (action) => {
  return async (req, res, next) => {
    await Activity.create({
      user: req.user.id,
      action,
    });
    next();
  };
};