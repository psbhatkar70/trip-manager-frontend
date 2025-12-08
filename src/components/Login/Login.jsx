import React from 'react'
import { useRef,useState } from 'react'
import api from '../../axios/api';
import { useNavigate } from 'react-router-dom';

function Login() {
const [showPassword, setShowPassword] = useState(false);
const emailRef =useRef(null);
const passwordRef =useRef(null);
const navigate=useNavigate();
const handlegotoSignup=()=>{
    navigate('/')
}
    const handleLogin = async ()=>{
         try {
            console.log("1st")
            const email=emailRef.current.value;
            const password=passwordRef.current.value;
          
            const res = await api.post('/user/login',{ email , password });
            localStorage.setItem('trip-access-token', res.data.token);
            localStorage.setItem("trip-user", JSON.stringify(res.data.user));

            console.log(res);
            navigate('/home');

        } catch (error) {
            console.log(error)
        }
    }
    
return (
  <>
    <div className="login-container">
      <div className="login-card">
        
        <h1 className="login-title">Welcome Back</h1>

        <button className="switch-btn" onClick={handlegotoSignup}>
          Sign Up
        </button>

        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input type="text" id="email" ref={emailRef} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Enter your Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              ref={passwordRef}
            />

            <span
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>

      </div>
    </div>

    <style>
      {`
        .login-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f5f5; /* Light grey background (NOT BLUE) */
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff; /* PURE WHITE CARD */
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeIn 0.4s ease;
        }

        .login-title {
          text-align: center;
          font-size: 26px;
          font-weight: bold;
          color: #222;
        }

        .switch-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          font-size: 16px;
          background: #e9e9e9;
          color: #333;
          cursor: pointer;
          transition: 0.2s;
          font-weight: 600;
        }
        .switch-btn:hover {
          background: #dcdcdc;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        label {
          font-size: 14px;
          color: #555;
          font-weight: 600;
        }

        input {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          font-size: 15px;
          outline: none;
          transition: 0.2s;
        }

        input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 4px rgba(79,70,229,0.3);
        }

        .password-wrapper {
          position: relative;
        }

        .eye-btn {
          position: absolute;
          right: 12px;
          top: 11px;
          cursor: pointer;
          font-size: 18px;
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #000000ff;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.25s;
        }

        .login-btn:hover {
          background: #3c34c1;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 24px;
          }
          .login-title {
            font-size: 22px;
          }
        }
      `}
    </style>
  </>
);


}

export default Login