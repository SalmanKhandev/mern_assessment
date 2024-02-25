const mongoose = require("mongoose");
const User = require("./models/user.model");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mern_assessment", {})
  .then((result) => {
    console.log("Datbase is connected..");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
// Number of users to generate
const numUsers = 10000;

// Seed the database
async function seedDatabase() {
  try {
    const users = Array.from({ length: numUsers }, (_, index) => ({
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      password: "$2a$10$90xcS9XqUqVCyGa0I0q5nODiHt3cJZ1YOG9Ra4cZGduNzCG0FS0D.", //its  secret password
      role: "user", // Example role
      addresses: [
        {
          addressLine1: `Address Line 1 - ${index + 1}`,
          addressLine2: `Address Line 2 - ${index + 1}`,
          country: `Country - ${index + 1}`,
          city: `City - ${index + 1}`,
          state: `State - ${index + 1}`,
        },
      ],
    }));

    // Insert users into the database
    await User.insertMany(users);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
