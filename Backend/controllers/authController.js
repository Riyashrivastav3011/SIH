import User from '../models/auth.js'
import generateToken from '../middlewares/generateToken.js'
import generateOtp from '../utils/generateOtp.js'
import {sendVerificationCode , sendWelcomeEmail} from '../utils/email.js'
import bcrypt from 'bcryptjs'

export const createuser = async (req , res) => {
    try{
      console.log("api hit");
       const {name , email , password , mobile , role} = req.body;
       const exist = await User.findOne({email});
        if(exist){
          return res.status(400).json({message:'Email already registered'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password  , salt);
        const verificationCode = generateOtp();
        const userData ={ name , email , mobile, password:hashed , role , verificationCode}    
        const user = await User.create(userData);
        await sendVerificationCode(user.email , verificationCode);

  return res.status(200).json({
  message: "OTP sent to your email",
  email: user.email
});
    }
    catch(err){
    console.log(err);
    res.status(400).json({message:err});
  } 
}

export const loginuser = async(req , res) => {
      try{
      console.log("api hit");
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if(!user){
        return res.status(400).json({message:'invalid email'})
    }

    const match = await bcrypt.compare(password , user.password);
    if(!match){
        return res.status(400).json({message:'invalid password'});
    }
    const verificationCode = generateOtp();

    user.verificationCode = verificationCode;

await user.save();

await sendVerificationCode(user.email, verificationCode);

return res.status(200).json({
  message: "OTP sent to your email",
  email: user.email
});
  }
    catch(err){
    console.log(err)
    res.status(400).json({message:'server error' , err});
   }
}




export const verifyotp = async (req, res) => {
  try {
    const { email, otp} = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    
      if (String(user.verificationCode).trim() !== String(otp).trim()) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    user.isVerified = true;
    user.verificationCode = undefined;

    await user.save();
    await sendWelcomeEmail(user.email, user.name );
    const token = generateToken(user._id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "OTP verified successfully",
      user: {
        email: user.email,
        role: user.role,
        name: user.name
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server error"
    });
  }
};