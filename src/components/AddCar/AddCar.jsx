import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../axios/api';

function AddCar() {
const namecar=useRef(null);
const perkmprice=useRef(null);
const number=useRef(null);
const driver=useRef(null);
const navigate=useNavigate();

const handlecreateCar = async ()=>{
    try {
        const name=namecar.current.value;
        const pricePerKm=perkmprice.current.value;
        const carNumber=number.current.value;
        const driverCost=driver.current.value;

        const res = await api.post('/cars',{ name , pricePerKm , carNumber , driverCost });

        alert("Car created successfully");
        navigate('/home')
    } catch (error) {
        console.log(error);
    }
}

 return (
  <>
    <style>{`
      body {
        background: #111;
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
      }

      .addcar-container {
        max-width: 480px;
        margin: 40px auto;
        padding: 30px 22px;
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      }

      .addcar-title {
        text-align: center;
        font-size: 28px;
        font-weight: 600;
        color: #f1f1f1;
        margin-bottom: 25px;
      }

      .input-group {
        margin-bottom: 18px;
        display: flex;
        flex-direction: column;
      }

      .input-group label {
        color: #ffffffff;
        font-weight: 500;
        margin-bottom: 6px;
        font-size: 15px;
      }

      .input-group input {
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.15);
        background: rgba(255,255,255,0.06);
        color: #fff;
        font-size: 16px;
        outline: none;
        transition: 0.2s ease;
      }

      .input-group input:focus {
        border-color: #ffffffff;
        background: rgba(255,255,255,0.1);
      }

      .addcar-btn {
        width: 100%;
        padding: 15px;
        margin-top: 10px;
        background: linear-gradient(135deg, #ffffffff, #b38a42);
        border: none;
        border-radius: 14px;
        color: #111;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.2s ease-in-out;
      }

      .addcar-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.25);
      }

      @media (max-width: 480px) {
        .addcar-container {
          padding: 25px 18px;
        }
      }
    `}</style>

    <div className="addcar-container">

      <h2 className="addcar-title">Add New Car</h2>

      <div className="input-group">
        <label>Enter your new Car model</label>
        <input type="text" id="carname" ref={namecar} />
      </div>

      <div className="input-group">
        <label>Enter your new Car number</label>
        <input type="text" ref={number} />
      </div>

      <div className="input-group">
        <label>Enter the price per Km for trips</label>
        <input type="text" ref={perkmprice} />
      </div>

      <div className="input-group">
        <label>Enter your driver cost for this car</label>
        <input type="text" ref={driver} />
      </div>

      <button className="addcar-btn" onClick={handlecreateCar}>
        Create Car
      </button>
    </div>
  </>
);

}

export default AddCar