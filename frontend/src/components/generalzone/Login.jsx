import "./RegistrationPage.css";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'

function Login() {
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
  const [form , setForm] = useState({
    'email':'',
    'password':'',   
  })

  const handleChange = (e) =>{
      setForm({...form , [e.target.name]:e.target.value});
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    if(loading)return;
    setLoading(true);
    const payload = {
      email:form.email,
      password:form.password
    }
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, payload);
      toast.success("logged In");
      navigate("/verify" , { state: { email: form.email } }); 
    }catch (err) {
    const message = err.response?.data?.message || 'Login failed. Please try again.';
    toast.error(message);
    setLoading(false);
  }finally {
    setLoading(false);
  }
  }

  return (
    <div className="page">
      <div className="card">

        <div className="register-box">
          <h1>Login</h1>

          <form onSubmit={handleLogin}>
            <div className="input-box">
              <input type="email" name="email" onChange={handleChange} value={form.email} placeholder="Email" required />
              <span>@</span>
            </div>

            <div className="input-box">
              <input type="password" name="password" onChange={handleChange} value={form.password} placeholder="Password" required />
              <span>🔒</span>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "wait..." : "login"}
            </button>
          </form>

          <p className="or-text">or login with google</p>

          <div className="social-login">
            <a href="#" title="Google">G</a>
          </div>
        </div>

        {/* Right side - Welcome panel */}
        <div className="welcome-box">
          <h2>Welcome</h2>
          <p>Don't have an account?</p>
          <button className="btn-login" onClick={()=> navigate('/')}>
            Register
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;