import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../axios/api';
import dayjs from 'dayjs';

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

// ---------- Paste this whole block as your return (replaces previous loader + page) ----------
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
        background: "#fafafa", // soft light background
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: "#111",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "7px solid #eef2f5",
          borderTopColor: "#111", // subtle black accent
          animation: "spin 0.85s linear infinite",
          boxShadow: "0 6px 18px rgba(16,24,40,0.06)",
        }}
      />

      <p
        style={{
          marginTop: 16,
          fontSize: 16,
          fontWeight: 500,
          color: "#333",
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

// ---------- Main page (White Elegant Premium Theme) ----------
return (
  <div
    style={{
      minHeight: "100vh",
      background: "#fbfbfc",
      padding: "40px 20px",
      fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "#111",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div style={{ width: "100%", maxWidth: 900 }}>
      <h1
        style={{
          fontSize: 30,
          fontWeight: 700,
          textAlign: "center",
          marginBottom: 20,
          color: "#0b1220",
          letterSpacing: 0.2,
        }}
      >
        {car?.name ?? "Car Details"}
      </h1>

      <div
        style={{
          padding: 22,
          borderRadius: 12,
          background: "#ffffff",
          border: "1px solid #eef0f3",
          boxShadow: "0 6px 18px rgba(12,18,24,0.06)",
          marginBottom: 28,
          color: "#0b1220",
        }}
      >
        <p style={{ margin: "8px 0" }}>
          <strong style={{ color: "#111" }}>Car Number:</strong>{" "}
          <span style={{ color: "#111" }}>{car?.carNumber ?? "-"}</span>
        </p>

        <p style={{ margin: "8px 0" }}>
          <strong style={{ color: "#111" }}>Driver Cost per Trip:</strong>{" "}
          <span style={{ color: "#111" }}>₹{car?.driverCost ?? "-"}</span>
        </p>

        <p style={{ margin: "8px 0" }}>
          <strong style={{ color: "#111" }}>Price per Km:</strong>{" "}
          <span style={{ color: "#111" }}>₹{car?.pricePerKm ?? "-"}</span>
        </p>

        <p style={{ margin: "8px 0" }}>
          <strong style={{ color: "#111" }}>Total Distance:</strong>{" "}
          <span style={{ color: "#111" }}>
            {car?.distanceTravelled ?? 0} km
          </span>
        </p>

        <p style={{ margin: "10px 0 0 0", fontSize: 16 }}>
          <strong style={{ color: "#111" }}>Total Earnings:</strong>{" "}
          <span style={{ color: "#111" }}>₹{car?.totalEarning ?? 0}</span>
        </p>
      </div>

      <h3
        style={{
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 14,
          color: "#0b1220",
          textAlign: "left",
        }}
      >
        Trips by this Car
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Array.isArray(trips) && trips.length > 0 ? (
          trips.map((trip) => (
            <div
              key={trip._id}
              style={{
                padding: 16,
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid #eef0f3",
                boxShadow: "0 4px 14px rgba(12,18,24,0.04)",
                transition: "transform 0.16s ease, box-shadow 0.16s ease",
                color: "#0b1220",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(12,18,24,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(12,18,24,0.04)";
              }}
            >
              <p style={{ marginBottom: 6, fontSize: 15, fontWeight: 600 }}>
                {trip.TripName}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  fontSize: 14,
                  color: "#25303b",
                }}
              >
                <div>
                  <strong>Car Used:</strong> <span>{trip.name}</span>
                </div>

                <div>
                  <strong>Car Number:</strong> <span>{trip.number}</span>
                </div>

                <div>
                  <strong>Trip Date:</strong> <span>{dayjs(trip.TripDate).format("DD-MM-YYYY")}</span>
                </div>
                <div>
                  <strong>Trip End Date:</strong> <span>{dayjs(trip.TripDateEnd).format("DD-MM-YYYY")}</span>
                </div>

                <div>
                  <strong>Created:</strong> <span>{dayjs(trip.date).format("DD-MM-YYYY")}</span>
                </div>

                <div>
                  <strong>Total Distance:</strong> <span>{trip.distance} km</span>
                </div>

                <div>
                  <strong>Total Earnings:</strong> <span>₹{trip.cost}</span>
                </div>
                <div>
                  <strong>Status:</strong> <span>{trip.completed  ? <p>Completed</p> : <p>Pending for {dayjs(trip.TripDate).format("DD-MM-YYYY")}</p>}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No trips found for this car.
          </p>
        )}
      </div>
    </div>
  </div>
);


}

export default SingleCar