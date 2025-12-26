import React, { useEffect, useState } from 'react'
import api from '../../axios/api';
import dayjs from 'dayjs';

function AllTrips() {
    const [trips,setTrips]=useState([]);
    const [loading,setLoading]=useState(true);
    // dayjs(existingtrip.TripDate).format("DD-MM-YYYY")
    
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
          border: "6px solid #e6e9ee",
          borderTopColor: "#111", // premium black accent
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
            to { transform: rotate(360deg); }
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
      background: "#fafafa",
      padding: "40px 20px",
      fontFamily: "Inter, sans-serif",
      color: "#111",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div style={{ width: "100%", maxWidth: "900px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          marginBottom: "25px",
          textAlign: "center",
          color: "#111",
          letterSpacing: "0.2px",
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
              borderRadius: "12px",
              background: "#ffffff",
              border: "1px solid #eceff2",
              boxShadow: "0 6px 18px rgba(15,15,15,0.04)",
              transition: "transform 0.18s ease, box-shadow 0.18s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(15,15,15,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(15,15,15,0.04)";
            }}
          >
            <p style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 600 }}>
              {trip.TripName}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "14px", color: "#333" }}>
              <div><strong>Car Used:</strong> {trip.name}</div>
              <div><strong>Car Number:</strong> {trip.number}</div>

              <div><strong>Trip Date:</strong> {dayjs(trip.TripDate).format("DD-MM-YYYY")}</div>
              <div><strong>Trip End Date:</strong> {dayjs(trip.TripDateEnd).format("DD-MM-YYYY")}</div>

              <div><strong>Trip Created:</strong> {dayjs(trip.date).format("DD-MM-YYYY")}</div>

              <div><strong>Total Distance:</strong> {trip.distance} km</div>
              <div><strong>Total Earnings:</strong> ₹{trip.cost}</div>
              <div>{trip.completed  ? <p>Completed</p> : <p>Pending for {dayjs(trip.TripDate).format("DD-MM-YYYY")}</p>}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


}

export default AllTrips