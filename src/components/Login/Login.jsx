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
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4f6fb;
          padding: 20px;
        }
        .login-card {
          background: #fff;
          width: 100%;
          max-width: 380px;
          padding: 30px;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        .login-title {
          text-align: center;
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 25px;
          color: #222;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 18px;
        }
        .input-group label {
          margin-bottom: 6px;
          font-size: 15px;
          color: #444;
        }
        .input-group input {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
          transition: 0.2s;
        }
        .input-group input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 4px rgba(79, 70, 229, 0.3);
        }
        .password-wrapper {
          position: relative;
        }
        .eye-btn {
          position: absolute;
          right: 12px;
          top: 11px;
          font-size: 18px;
          cursor: pointer;
        }
        .login-btn {
          width: 100%;
          padding: 12px;
          border: none;
          background: #4f46e5;
          color: #fff;
          border-radius: 12px;
          font-size: 17px;
          cursor: pointer;
          transition: 0.2s;
          margin-top: 10px;
        }
        .login-btn:hover {
          background: #3e38c2;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">

          <h1 className="login-title">Welcome Back!</h1>
        <button className="signup-btn" onClick={handlegotoSignup}>
        Sign Up
      </button>
          <div className="input-group">
            <label htmlFor="email">Enter your email</label>
            <input type="text" id="email" ref={emailRef} />
          </div>

          <div className="input-group">
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
    </>
  )
}

export default Login