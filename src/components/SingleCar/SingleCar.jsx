import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../axios/api';

function SingleCar() {
    const { _id }=useParams();
    const [loading,setLoading]=useState(true);
    const [car,setCar]=useState([]);
    const [trips,setTrips]=useState([]);
    useEffect(()=>{
        const getcarInfo= async ()=>{
            const res=await api.get(`/cars/${_id}`);
            setCar(res.data.data);
            
        };
        const getcartrips=async ()=>{
          try {
          const res = await api.get(`/trips/car?carid=${_id}`);
          setTrips(res.data.data.trips);
          console.log(res);
          setLoading(false);
          } catch (error) {
            console.log(error)
          }
        }
        getcartrips();
        getcarInfo();
    },[])

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
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)",
      padding: "40px 20px",
      color: "#fff",
      fontFamily: "Inter, sans-serif",
      display: "flex",
      justifyContent: "center"
    }}
  >
    <div style={{ width: "100%", maxWidth: "700px" }}>
      
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "25px",
          color: "#e5ddff",
          letterSpacing: "1px"
        }}
      >
        {car.name}
      </h1>

      <div
        style={{
          padding: "25px",
          borderRadius: "18px",
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          marginBottom: "40px"
        }}
      >
        <p style={{ margin: "10px 0" }}>
          <strong style={{ color: "#b79cff" }}>Car Number:</strong>{" "}
          {car.carNumber}
        </p>

        <p style={{ margin: "10px 0" }}>
          <strong style={{ color: "#b79cff" }}>Driver Cost per Trip:</strong> ₹
          {car.driverCost}
        </p>

        <p style={{ margin: "10px 0" }}>
          <strong style={{ color: "#b79cff" }}>Price per Km:</strong> ₹
          {car.pricePerKm}
        </p>

        <p style={{ margin: "10px 0" }}>
          <strong style={{ color: "#b79cff" }}>Total Distance:</strong>{" "}
          {car.distanceTravelled} km
        </p>

        <p style={{ margin: "10px 0", fontSize: "17px" }}>
          <strong style={{ color: "#b79cff" }}>Total Earnings:</strong> ₹
          {car.totalEarning}
        </p>
      </div>

      <h3
        style={{
          fontSize: "22px",
          fontWeight: "600",
          marginBottom: "15px",
          color: "#e0d5ff",
          textAlign: "center"
        }}
      >
        Trips by this Car
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {trips.map((trip) => (
          <div
            key={trip._id}
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
              backdropFilter: "blur(6px)",
              transition: "0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 30px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0,0,0,0.35)";
            }}
          >
            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#b79cff" }}>Trip Name:</strong>{" "}
              {trip.TripName}
            </p>

            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#b79cff" }}>Car Used:</strong>{" "}
              {trip.name}
            </p>

            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#b79cff" }}>Car Number:</strong>{" "}
              {trip.number}
            </p>

            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#b79cff" }}>Total Distance:</strong>{" "}
              {trip.distance} km
            </p>

            <p>
              <strong style={{ color: "#b79cff" }}>Total Earnings:</strong> ₹
              {trip.cost}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default SingleCar