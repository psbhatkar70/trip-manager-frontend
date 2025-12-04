import React from 'react'
import { useRef } from 'react'
import api from '../../axios/api'
import { useNavigate } from 'react-router-dom';
function SignUp() {

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
  return (
   <>
  <div className="signup-container">

    <div className="signup-card">

      <h1 className="title">Sign Up for Trip Manager</h1>

      <button className="login-btn" onClick={handlegotologin}>
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

      <button className="signup-btn" onClick={handleSignup}>
        Sign Up
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
        padding: 20px;
        background: linear-gradient(135deg, #4b79a1, #283e51);
      }

      .signup-card {
        width: 100%;
        max-width: 420px;
        background: white;
        padding: 32px;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        display: flex;
        flex-direction: column;
        gap: 16px;
        animation: fadeIn 0.4s ease;
      }

      .title {
        text-align: center;
        margin-bottom: 10px;
        font-size: 26px;
        font-weight: bold;
        color: #333;
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
        padding: 10px 14px;
        border-radius: 8px;
        border: 1px solid #ccc;
        font-size: 15px;
        outline: none;
        transition: 0.2s;
      }

      input:focus {
        border-color: #4b79a1;
        box-shadow: 0 0 4px rgba(75, 121, 161, 0.4);
      }

      .signup-btn,
      .login-btn {
        width: 100%;
        padding: 12px;
        border-radius: 10px;
        border: none;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.25s;
      }

      .signup-btn {
        background: #4b79a1;
        color: white;
      }

      .signup-btn:hover {
        background: #3b6a8d;
      }

      .login-btn {
        background: #f0f0f0;
        color: #333;
      }

      .login-btn:hover {
        background: #e1e1e1;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* MOBILE RESPONSIVE */
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

  )
}

export default SignUp