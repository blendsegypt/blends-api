/*

  generateOTP
   - helper to generate 4 digits OTP for phone verification

*/
const generateOTP = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
};

export default generateOTP;
