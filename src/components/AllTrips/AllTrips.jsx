import React, { useEffect, useState } from 'react'
import api from '../../axios/api';

function AllTrips() {
    const [trips,setTrips]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const getalltrips=async ()=>{
            const res = await api.get('/trips');
            console.log(res)
            setTrips(res.data.data.trips);
            
            setLoading(false);
        }
        getalltrips();
    }
    ,[])


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
      background: "linear-gradient(135deg, #0d0d0d, #1b1b1b)",
      padding: "40px 20px",
      fontFamily: "Inter, sans-serif",
      color: "#fff",
      display: "flex",
      justifyContent: "center"
    }}
  >
    <div style={{ width: "100%", maxWidth: "700px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "25px",
          textAlign: "center",
          color: "#f1f1f1",
          letterSpacing: "0.5px"
        }}
      >
        Your Trips
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {trips.map((trip) => (
          <div
            key={trip._id}
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
              transition: "0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0,0,0,0.35)";
            }}
          >
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              <strong style={{ color: "#b79cff" }}>Trip Name:</strong>{" "}
              {trip.TripName}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#b79cff" }}>Car Used:</strong>{" "}
              {trip.name}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#b79cff" }}>Trip Date:</strong>{" "}
              {trip.TripDate}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#b79cff" }}>Trip Created:</strong>{" "}
              {trip.date}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#b79cff" }}>Car Number:</strong>{" "}
              {trip.number}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#b79cff" }}>Total Distance:</strong>{" "}
              {trip.distance} km
            </p>
            <p style={{ fontSize: "17px", marginTop: "5px" }}>
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

export default AllTrips