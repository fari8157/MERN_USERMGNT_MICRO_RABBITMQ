import User from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';
import otpService from '../reposetory/otp.js';
import { generateOtp } from '../utils/otp.js';
import { sendEmail } from '../utils/sendMail.js';



export const register = async (req, res) => {
  try {
    console.log("hiiii")
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashed = await hashPassword(password);
    const image = req.file ? req.file.filename : '';

    const user = await User.create({ name, email, password: hashed, image });

    // Generate OTP (e.g., 6 digit)
    const otp = generateOtp(); // => '123456'

    // Save OTP to DB
    await otpService.insertOTP(user._id, otp, 10); // 10 minutes expiry

    // Send OTP via Email
    await sendEmail(user.email, otp);
    

    res.status(201).json({ message: 'Registered successfully. OTP sent to email.' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    console.log("hiiii")
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    if (user.isBlocked) return res.status(403).json({ message: 'User is blocked' });

    const token = generateToken(user);

    // remove password before sending user
    const { password: _, ...userData } = user.toObject();

    res.json({ token, user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};


export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate ID format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error in getUserById:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
    console.log(email,otp)
  try {
    const user = await User.findOne({ email });
     console.log(user)
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = await OTP.verifyOtp(user._id, otp); // Pass user._id, not email
     console.log(isValid)
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

