import mongoose from "mongoose";
import { hash } from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (this: any) {
          return this.email || this.phoneno;
        },
        message: "Either email or phone number must be provided.",
      },
    },
    phoneno: {
      type: String,
      validate: {
        validator: function (this: any) {
          return this.email || this.phoneno;
        },
        message: "Either email or phone number must be provided.",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const Users = mongoose.model("Users", userSchema);

export default Users;
