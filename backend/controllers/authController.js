import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import sendEmail from "../utils/sendEmail.js"; // 👈 IMPORTANT

// 🔐 SIGNUP
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } = req.body;

    if (!firstName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too weak" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Signup successful",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔑 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
// // ===============================
// // 🔥 FORGOT PASSWORD (SEND OTP)
// // ===============================


// export const sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000;
//     await user.save();

//     console.log("Sending OTP to:", email);

//     // ✅ FIX HERE
//     await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);

//     res.json({ message: "OTP sent successfully" });

//   } catch (error) {
//     console.log("EMAIL ERROR:", error);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };
// // ===============================
// // ✅ VERIFY OTP
// // ===============================
// export const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });

//     if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     res.json({ message: "OTP verified ✅" });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ===============================
// // 🔑 RESET PASSWORD
// // ===============================
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     res.json({ message: "Password reset successful ✅" });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };