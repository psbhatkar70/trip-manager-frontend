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
 
// ----------------------
// Elegant Loader (Same Style)
// ----------------------
if (loading) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f8f9fc",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "6px solid #e1e4e8",
          borderTopColor: "#111",
          animation: "spin 1s linear infinite",
        }}
      />

      <p
        style={{
          marginTop: "16px",
          fontSize: "17px",
          fontWeight: 500,
          color: "#444",
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

// ----------------------
// Cars Page (Premium White UI)
// ----------------------
return (
  <>
    <div
      className="cars-container"
      style={{
        maxWidth: "650px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        className="cars-heading"
        style={{
          textAlign: "center",
          marginBottom: "22px",
          color: "#111",
          fontWeight: 600,
        }}
      >
        Your Cars
      </h1>

      {myCars.map((cars) => (
        <Link
          to={`/cars/${cars._id}`}
          key={cars._id}
          className="car-card"
          style={{
            display: "block",
            padding: "18px",
            borderRadius: "14px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            marginBottom: "18px",
            textDecoration: "none",
            color: "#111",
          }}
        >
          <div
            className="car-title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "10px",
            }}
          >
            <span>{cars.name}</span>
            <span className="car-icon">🚗</span>
          </div>

          <div className="car-info" style={{ fontSize: "15px", lineHeight: "22px" }}>
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