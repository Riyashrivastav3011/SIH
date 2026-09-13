import { transporter } from "./emailConfig.js";

// ================= OTP EMAIL =================
export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const info =  await transporter.sendMail({
      from: `"ARCASS" <${process.env.Email_User}>`,
      to: email,
      subject: "Your skill bridge Verification Code",

      text: `Your skill bridge verification code is ${verificationCode}.`,

      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f7fb; padding:40px 20px;">
          <div style="max-width:500px; margin:auto; background:white; padding:35px; border-radius:12px; text-align:center;">

            <h1 style="color:#2563eb;">Skill bridge</h1>

            <h2>Verify Your Email</h2>

            <p style="color:#666;">
              Use the verification code below to verify your email address.
            </p>

            <div style="
              margin:25px 0;
              padding:15px;
              background:#eff6ff;
              border-radius:8px;
              font-size:30px;
              font-weight:bold;
              letter-spacing:8px;
              color:#2563eb;
            ">
              ${verificationCode}
            </div>

            <p style="color:#777; font-size:13px;">
              If you didn't request this code, you can safely ignore this email.
            </p>

            <hr style="border:none; border-top:1px solid #eee; margin:25px 0;">

            <p style="color:#999; font-size:12px;">
              © 2026 skill bridge. All rights reserved.
            </p>

          </div>
        </div>
      `
    });
    console.log("mail info:",info);
    console.log("messaegid:", info.messageId);
    console.log("response:", info.response);

    console.log("OTP email sent successfully");

  } catch (error) {
    console.log("OTP email error:", error);
    throw error;
  }
};


// ================= WELCOME EMAIL =================
export const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: '"Skill bridge" <riyashrivastav06348@gmail.com>',
      to: email,
      subject: "Welcome to skill bridge 🎉",

      text: `Welcome to Skill bridge, ${name}! Your email has been successfully verified.`,

      html: `
        <div style="font-family:Arial,sans-serif; background:#f4f7fb; padding:40px 20px;">

          <div style="
            max-width:550px;
            margin:auto;
            background:white;
            padding:40px;
            border-radius:14px;
            text-align:center;
          ">

            <h1 style="color:#2563eb;">skill bridge</h1>

            <div style="font-size:50px; margin:20px 0;">
              🎉
            </div>

            <h2>Welcome, ${name}!</h2>

            <p style="
              color:#555;
              font-size:16px;
              line-height:1.6;
            ">
              Your email has been successfully verified.
              We're excited to have you join Skill bridge.
            </p>

            <div style="
              margin:25px 0;
              padding:18px;
              background:#eff6ff;
              border-radius:10px;
            ">
              <p style="
                margin:0;
                color:#2563eb;
                font-weight:bold;
              ">
                ✓ Email Verified Successfully
              </p>
            </div>

            <p style="
              color:#666;
              font-size:14px;
              line-height:1.6;
            ">
              You can now explore skill bridge and make the most of your account.
            </p>

            <p style="color:#777; font-size:13px;">
              Thanks for joining us!
            </p>

            <hr style="
              border:none;
              border-top:1px solid #eee;
              margin:30px 0;
            ">

            <p style="color:#999; font-size:12px;">
              © 2026 skill bridge. All rights reserved.
            </p>

          </div>
        </div>
      `
    });

    console.log("Welcome email sent successfully");

  } catch (error) {
    console.log("Welcome email error:", error);
    throw error;
  }
};

