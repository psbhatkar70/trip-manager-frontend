import React, { useState } from 'react'
import { useRef } from 'react'
import api from '../../axios/api'
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const [loading,setLoading]=useState(false);
    const nameRef =useRef(null);
    const emailRef =useRef(null);
    const passwordRef =useRef(null);
    const confirmPasswordRef =useRef(null);
    const navigate = useNavigate();
    const handlegotologin= ()=>{
        navigate('/login')
    }
    const handleSignup =async ()=>{
        console.log("hello from here")
        try {
            console.log("1st")
            const name=nameRef.current.value;
            const email=emailRef.current.value;
            const password=passwordRef.current.value;
            const confirmPassword=confirmPasswordRef.current.value;
            console.log(name + email + password + confirmPassword)
            if(password !== confirmPassword) {
                console.log("Passsword must match");
                return;
            };
            const res = await api.post('/user/signup',{name , email , password , confirmPassword});
            localStorage.setItem('trip-access-token', res.data.token);
            localStorage.setItem("trip-user", JSON.stringify(res.data.newUser));

            navigate('/home');
            console.log(res);


        } catch (error) {
            console.log(error)
        }
    }

    const handleGuestLogin = async (e) => {
  e.preventDefault();
  setLoading(true)

  try {

    const res = await api.post('/user/login',{ email: "pravin@gmail.com", password: "Pass1234" });
    localStorage.setItem('trip-access-token', res.data.token);
    localStorage.setItem("trip-user", JSON.stringify(res.data.user));
    navigate('/home');
    setLoading(false);
  } catch (error) {
    console.error("Guest login failed:", error);
    alert("Guest Login Failed. Please check console.");
    setLoading(false);
  }
};
 return (
  <>
    <div className="signup-container">
      <div className="signup-card">

        <h1 className="title">Sign Up</h1>

        <button className="switch-btn" onClick={handlegotologin}>
          Log In
        </button>

        <div className="form-group">
          <label htmlFor="name">Enter your name</label>
          <input type="text" id="name" ref={nameRef} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input type="text" id="email" ref={emailRef} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Enter your Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
        </div>

        <button className="main-btn" onClick={handleSignup}>
          Sign Up
        </button>

        {loading && (
          <div className="loading-box">
            <div className="spinner" />
            <span>Signing in...</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleGuestLogin}
          className="guest-btn"
        >
          Try Guest Login (Recruiters)
        </button>

      </div>
    </div>

    <style>
      {`
      .signup-container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fafafa;
        padding: 20px;
      }

      .signup-card {
        width: 100%;
        max-width: 420px;
        background: #fff;
        padding: 32px;
        border-radius: 14px;
        border: 1px solid #eaeaea;
        box-shadow: 0 4px 14px rgba(0,0,0,0.05);
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .title {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        color: #111;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      label {
        font-size: 14px;
        color: #444;
        font-weight: 500;
      }

      input {
        padding: 12px;
        border-radius: 10px;
        border: 1px solid #ddd;
        background: #fff;
        font-size: 15px;
        outline: none;
        transition: 0.2s;
      }

      input:focus {
        border-color: #000;
      }

      .main-btn {
        width: 100%;
        padding: 12px;
        background: #000;
        color: #fff;
        border-radius: 10px;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.2s;
      }

      .main-btn:hover {
        background: #222;
      }

      .switch-btn {
        width: 100%;
        padding: 12px;
        border-radius: 10px;
        border: 1px solid #ddd;
        background: #fff;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        color: #000;
        transition: 0.2s;
      }

      .switch-btn:hover {
        background: #efefef;
      }

      .guest-btn {
        width: 100%;
        padding: 12px;
        border-radius: 10px;
        border: 1px solid #ddd;
        background: #fff;
        color: #000;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.2s;
      }

      .guest-btn:hover {
        background: #efefef;
      }

      .loading-box {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #eee;
        background: #fafafa;
        font-size: 14px;
        color: #444;
      }

      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #ddd;
        border-top: 2px solid #000;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @media (max-width: 480px) {
        .signup-card {
          padding: 24px;
        }
        .title {
          font-size: 22px;
        }
      }
      `}
    </style>
  </>
);

}

export default SignUp