import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "ADMIN", "ambulant", "detaillant", "gros"],
      default: "customer",
      required: true,
    },
    address: {
      adresse: {
        type: String,
        default: "",
      },

      ville: {
        type: String,
      },
      codePostal: {
        type: String,
      },
      phone: {
        type: String,
      },
    },

    numberTva: {
      type: String,
    },

    otp: String,
    credit: { type: Number, default: 0 },
    resetOtp: String,
    isVerified: { type: Boolean, default: false },
    ConfirmationFile: { type: String },
    otpExpires: Date,
    companyName: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
