import React, { useEffect, useState } from 'react'
import api from '../../axios/api'
import { Link } from 'react-router-dom';

function MyCars() {
const [myCars, setMyCars] = useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const fetchCars = async () => {
    try {
      const res = await api.get('/cars');
      setMyCars(res.data.data.cars);
      console.log(res.data.data.cars);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  fetchCars();
 },[]);
 
 if (loading){
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f5f7fa",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "6px solid #d0d7de",
          borderTopColor: "#4a90e2",
          animation: "spin 1s linear infinite",
        }}
      />

      <p
        style={{
          marginTop: "16px",
          fontSize: "18px",
          fontWeight: 500,
          color: "#555",
        }}
      >
        Loading, please wait...
      </p>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
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

      .cars-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 30px 20px;
      }

      .cars-heading {
        color: #f1f1f1;
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 30px;
        text-align: center;
      }

      .car-card {
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 18px;
        padding: 20px;
        margin-bottom: 22px;
        transition: 0.25s ease-in-out;
        color: #e6e6e6;
        text-decoration: none;
        display: block;
      }

      .car-card:hover {
        border-color: rgba(255, 255, 255, 0.25);
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      }

      .car-title {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .car-icon {
        font-size: 24px;
        color: #d4a857; /* Luxury gold */
      }

      .car-info p {
        margin: 6px 0;
        font-size: 16px;
        opacity: 0.85;
      }

      @media (max-width: 480px) {
        .car-title {
          font-size: 20px;
        }
        .car-card {
          padding: 16px;
        }
      }
    `}</style>

    <div className="cars-container">
      <h1 className="cars-heading">Your Cars</h1>

      {myCars.map((cars) => (
        <Link to={`/cars/${cars._id}`} key={cars._id} className="car-card">
          
          <div className="car-title">
            <span>{cars.name}</span>
            <span className="car-icon">🚗</span>
          </div>

          <div className="car-info">
            <p><strong>Car Number:</strong> {cars.carNumber}</p>
            <p><strong>Driver Cost per Trip:</strong> ₹{cars.driverCost}</p>
            <p><strong>Price per Km:</strong> ₹{cars.pricePerKm}</p>
            <p><strong>Total Distance:</strong> {cars.distanceTravelled} km</p>
            <p><strong>Total Earnings:</strong> ₹{cars.totalEarning}</p>
          </div>

        </Link>
      ))}
    </div>
  </>
);

}

export default MyCars