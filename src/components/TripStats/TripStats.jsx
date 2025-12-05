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

 if(loading) return <h1>Wait</h1>

return (
  <>
    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
      Total stats of all trips
    </h1>

    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px", 
      padding: "20px" 
    }}>
      {trips.map((trip) => (
        <div
          key={trip._id}
          style={{
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            background: "#fafafa",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
            {trip.Car}
          </p>

          <p><strong>Car number:</strong> {trip._id}</p>
          <p><strong>Total Distance:</strong> {trip.TotalDistance} km</p>
          <p><strong>Total Trips:</strong> {trip.TotalTrips}</p>
          <p><strong>Total Income:</strong> ₹{trip.totalincome}</p>
        </div>
      ))}
    </div>
  </>
);

}

export default TripStats