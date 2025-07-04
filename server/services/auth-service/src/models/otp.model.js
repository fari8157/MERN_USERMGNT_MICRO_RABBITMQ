// otp.model.js
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp_value: { type: String, required: true },
  expires_at: { type: Date, required: true },
});

export const OTP = mongoose.model('OTP', otpSchema);
