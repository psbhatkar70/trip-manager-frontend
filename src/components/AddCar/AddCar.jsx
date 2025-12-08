import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../axios/api';

function AddCar() {
const namecar=useRef(null);
const perkmprice=useRef(null);
const number=useRef(null);
const driver=useRef(null);
const navigate=useNavigate();
const [addingcar,setAddingcar]=useState(false);

const handlecreateCar = async ()=>{
  if(addingcar) return;
  setAddingcar(true);
    try {
        const name=namecar.current.value;
        const pricePerKm=perkmprice.current.value;
        const carNumber=number.current.value;
        const driverCost=driver.current.value;

        const res = await api.post('/cars',{ name , pricePerKm , carNumber , driverCost });

        alert("Car created successfully");
        navigate('/home')
        setAddingcar(false);
    } catch (error) {
        console.log(error);
        alert("Error")
        setAddingcar(false);
    }
}

return (
  <>
    <div className="addcar-container">

      <div className="addcar-card">

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
    </div>

    <style>
      {`
        .addcar-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4f4f4;
          padding: 20px;
        }

        .addcar-card {
          background: #ffffff;
          padding: 32px;
          border-radius: 18px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          gap: 18px;
          animation: fadeIn 0.4s ease;
        }

        .addcar-title {
          text-align: center;
          font-size: 26px;
          font-weight: 700;
          color: #222;
          margin-bottom: 8px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 14px;
          font-weight: 600;
          color: #555;
        }

        .input-group input {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          font-size: 15px;
          outline: none;
          transition: 0.2s;
        }

        .input-group input:focus {
          border-color: #999;
          box-shadow: 0 0 4px rgba(0,0,0,0.15);
        }

        .addcar-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          background: #222;      /* elegant black */
          color: white;
          transition: 0.2s;
        }

        .addcar-btn:hover {
          background: #000;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .addcar-card {
            padding: 26px;
          }
          .addcar-title {
            font-size: 22px;
          }
        }
      `}
    </style>
  </>
);


}

export default AddCar