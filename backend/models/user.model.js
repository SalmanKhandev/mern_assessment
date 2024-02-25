const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const addressSchema = new mongoose.Schema({
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  addresses: [addressSchema],
  role: { type: String, default: "user" },
  password: { type: String, required: true },
  phoneNo: { type: String },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
