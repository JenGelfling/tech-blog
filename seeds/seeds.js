const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { User, Post, Comment } = require("../models"); // Adjust path as needed

const seedUsers = async (users) => {
  // Hash passwords and prepare data
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        username: user.username,
        password: hashedPassword,
      };
    })
  );

  // Insert users into the database
  await User.bulkCreate(hashedUsers, { individualHooks: true });
  console.log("Users seeded successfully.");
};

const seedPosts = async (posts) => {
  await Post.bulkCreate(posts);
  console.log("Posts seeded successfully.");
};

const seedComments = async (comments) => {
  await Comment.bulkCreate(comments);
  console.log("Comments seeded successfully.");
};

const seedDatabase = async () => {
  try {
    // Load JSON data
    const users = JSON.parse(
      fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
    );
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, "posts.json"), "utf-8")
    );
    const comments = JSON.parse(
      fs.readFileSync(path.join(__dirname, "comments.json"), "utf-8")
    );

    // Seed data
    await seedUsers(users);
    await seedPosts(posts);
    await seedComments(comments);

    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Execute the seeding function
seedDatabase();
