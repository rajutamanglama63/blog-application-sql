const Blog = require("./Blog");
const User = require("./User");
const Reading = require("./Reading");
const Membership = require("./Memberships");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Reading, { through: Membership });
Reading.belongsToMany(User, { through: Membership });

// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Blog,
  User,
  Reading,
  Membership,
};
