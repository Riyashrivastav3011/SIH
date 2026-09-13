

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "./RegistrationPage.css";

function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  

  function handleChange(value, index) {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  }

  async function handleVerify(e) {
    e.preventDefault();

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          email,
          otp: otpCode,
        }
      );
    navigate('/');  
  toast.success("Account verified successfully!");


    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid OTP. Try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/resend-otp`,
        { email }
      );

      toast.success("OTP resent!");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  }

  return (
    <div className="page">
      <div className="otp-card">

        <h1>OTP Verification</h1>

        <p className="or-text">
          Enter the 6-digit code sent to your email {email}
        </p>

        <form onSubmit={handleVerify}>

          <div className="otp-box">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
              />
            ))}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <p className="or-text">
          Didn't get the code?{" "}

          <span
            className="resend-link"
            onClick={handleResend}
            style={{ cursor: "pointer" }}
          >
            Resend OTP
          </span>
        </p>

      </div>
    </div>
  );
}

export default Otp;
