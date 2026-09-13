// import "./RegistrationPage.css";
// import { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
// import toast from "react-hot-toast";

// function Register() {
   
//   const navigate = useNavigate();
//   const [loading , setLoading] = useState(false);
//   const [form , setform] = useState({
//     name:'',
//     email:'',
//     password:'',
//     mob:'',
//     role:'student',
//   });
   
//   const handleChange = (e) =>{
//       setform({...form , [e.target.name]:e.target.value});
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//      if (loading) return;
//      setLoading(true);
//     const payload = {
//       name:form.name,
//       email:form.email,
//       password:form.password,
//       mob:form.mob,
//       role:form.role
//     } 
//     try{
//       await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, payload);
//       toast.success("Registration successful!");
//       navigate("/verify" , { state: { email: form.email } }); 
//     }catch (err) {
//     const message = err.response?.data?.message || 'Signup failed. Please try again.';
//     toast.error(message);
//     setLoading(false);
//   }finally {
//     setLoading(false);
//   }
//   }

//   return (
//     <div className="page">
//       <div className="card">

//         {/* Left side - Registration form */}
//         <div className="register-box">
//           <h1>Create your account</h1>

//           <form onSubmit={handleSubmit}>
//             <div className="input-box">
//               <input type="text"
//                placeholder="Username"
//                name="name"
//                value={form.name}
//                onChange={handleChange} 
//                required />
//               <span>👤</span>
//             </div>

//             <div className="input-box">
//               <input type="email" 
//               placeholder="Email"
//                name="email"
//                value={form.email}
//                onChange={handleChange} 
//               required />
//               <span>@</span>
//             </div>

//             <div className="input-box">
//               <input type="tel"
//                placeholder="Mobile Number" 
//                 name="mob"
//                value={form.mob}
//                onChange={handleChange} 
//                required />
//               <span>📱</span>
//             </div>

//             <div className="input-box">
//               <select required  name="role" onChange={handleChange} value={form.role}
//                className="bg-white text-gray-800 [&>option]:bg-[brown] [&>option]:text-white">
//                 <option value="student">Student</option>
//                 <option value="industry">Industry</option>
//                 <option value="academician">Academician</option>
//                 <option value="institution">Institution</option>
//               </select>
//               <span>▾</span>
//             </div>

//             <div className="input-box">
//               <input type="password" 
//               placeholder="Password" 
//                name="password"
//                value={form.password}
//                onChange={handleChange} 
//               required />
//               <span>🔒</span>
//             </div>

//             <button type="submit" className="btn-primary" disabled={loading}>
//                {loading ? "wait..." : "Register"}
//             </button>
//           </form>

//           <p className="or-text">or register with google</p>

//           <div className="social-login">
//             <a href="#" title="Google">G</a>
//           </div>
//         </div>

//         {/* Right side - Welcome panel */}
//         <div className="welcome-box">
//           <h2>Welcome Back!</h2>
//           <p>Already have an account?</p>
//           <button className="btn-login" onClick={() => navigate('/login')}>
//             Login
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Register;


import "./RegistrationPage.css";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import Dropdown from "./Dropdown"

function Register() {

  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
  const [form , setform] = useState({
    name:'',
    email:'',
    password:'',
    mob:'',
    role:'student',
  });

  const handleChange = (e) =>{
      setform({...form , [e.target.name]:e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (loading) return;
     setLoading(true);
    const payload = {
      name:form.name,
      email:form.email,
      password:form.password,
      mob:form.mob,
      role:form.role
    }
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, payload);
      toast.success("Registration successful!");
      navigate("/verify" , { state: { email: form.email } });
    }catch (err) {
    const message = err.response?.data?.message || 'Signup failed. Please try again.';
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
          <h1>Create your account</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input type="text"
               placeholder="Username"
               name="name"
               value={form.name}
               onChange={handleChange}
               required />
              <span>👤</span>
            </div>

            <div className="input-box">
              <input type="email"
              placeholder="Email"
               name="email"
               value={form.email}
               onChange={handleChange}
              required />
              <span>@</span>
            </div>

            <div className="input-box">
              <input type="tel"
               placeholder="Mobile Number"
                name="mob"
               value={form.mob}
               onChange={handleChange}
               required />
              <span>📱</span>
            </div>

            <Dropdown
              name="role"
              value={form.role}
              onChange={handleChange}
              options={[
                { value: "student", label: "Student" },
                { value: "industry", label: "Industry" },
                { value: "academician", label: "Academician" },
                { value: "institution", label: "Institution" },
              ]}
              placeholder="Select role"
            />

            <div className="input-box">
              <input type="password"
              placeholder="Password"
               name="password"
               value={form.password}
               onChange={handleChange}
              required />
              <span>🔒</span>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
               {loading ? "wait..." : "Register"}
            </button>
          </form>

          <p className="or-text">or register with google</p>

          <div className="social-login">
            <a href="#" title="Google">G</a>
          </div>
        </div>

        <div className="welcome-box">
          <h2>Welcome Back!</h2>
          <p>Already have an account?</p>
          <button className="btn-login" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Register;