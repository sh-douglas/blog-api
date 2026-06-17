import User from "./User.js";
import Post from "./Post.js";

User.hasMany(Post, {
  foreignKey: "authorId",
  as: "posts",
});

Post.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

export { Post, User };
