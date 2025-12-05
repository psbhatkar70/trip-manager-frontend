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