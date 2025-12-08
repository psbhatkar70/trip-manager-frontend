import React, { useEffect, useState } from 'react'
import api from '../../axios/api';

function TripStats() {
  const [trips,setTrips]=useState([]);
   const [loading,setLoading]=useState(true);
  useEffect(()=>{
        const getalltrips=async ()=>{
            const res = await api.get('/trips/stats');
            console.log(res)
            setTrips(res.data.data.stats);
            setLoading(false);
        }
        getalltrips();
    }
    ,[])

// ----------------------
// Elegant Loader Styles
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
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

// --------------------------
// Elegant Stats UI (White)
// --------------------------
return (
  <>
    <h1
      style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#111",
        fontWeight: 600,
      }}
    >
      Total Stats of All Trips
    </h1>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {trips.map((trip) => (
        <div
          key={trip._id}
          style={{
            padding: "18px",
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "#111",
            }}
          >
            {trip.Car}
          </p>

          <p style={{ margin: "4px 0" }}>
            <strong>Car Number:</strong> {trip._id}
          </p>

          <p style={{ margin: "4px 0" }}>
            <strong>Total Distance:</strong> {trip.TotalDistance} km
          </p>

          <p style={{ margin: "4px 0" }}>
            <strong>Total Trips:</strong> {trip.TotalTrips}
          </p>

          <p style={{ margin: "4px 0" }}>
            <strong>Total Income:</strong> ₹{trip.totalincome}
          </p>
        </div>
      ))}
    </div>
  </>
);


}

export default TripStats