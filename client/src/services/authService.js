import api from './axios';
export const loginUser = async (data) => {
  try {
    const res = await api.post('/auth/login', data);
    
    return res.data;
  } catch (err) {
    console.error('loginUser error:', err);
    throw err;
  
}
};
export const registerUser = async (formData) => {
  try {
    const res = await api.post('/auth/register', formData);
    return res.data;
  } catch (err) {
    console.error('registerUser error:', err);
    throw err;
  }
};

export const verifyOtp = (data) => {
  return api.post('/auth/verify-otp', data); // Adjust your endpoint
};