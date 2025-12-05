import React, { useEffect, useRef, useState } from 'react'
import api from '../../axios/api';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


function AddTrip() {
  const [date,setDate]=useState();
    const [myCars, setMyCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [cost,setCost]=useState(0);
    const nameRef =useRef(null);
    const distRef=useRef(null);
    const navigate=useNavigate();
    
    const handleCost=()=>{
      setCost(selectedCar.pricePerKm * distRef.current.value + selectedCar.driverCost);
    }
    

    const handleCreateTrip=async ()=>{
      const car =selectedCar._id;
      const distance = distRef.current.value;
      const TripName = nameRef.current.value;
      const TripDate=date;
     try {
       const res =await api.post('/trips',{ car , distance , TripName , TripDate});
      alert("Trip created Successfully");
      navigate('/home');

     } catch (error) {
      console.log(error);
     }
    }




    useEffect(()=>{
        const fetchCars = async () => {
    try {
      const res = await api.get('/cars');
      setMyCars(res.data.data.cars);
      console.log(res.data.data.cars);
    } catch (error) {
      console.log(error);
    }
  };

  fetchCars();
 },[]);
   

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  margin: "6px 0 15px 0",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  outline: "none",
  fontSize: "15px"
};

const primaryButton = {
  marginTop: "20px",
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #6a5af9, #8364ff)",
  border: "none",
  color: "#fff",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s"
};

const secondaryButton = {
  marginTop: "12px",
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#fff",
  fontWeight: "500",
  cursor: "pointer",
  transition: "0.3s"
};

const infoStyle = {
  marginBottom: "8px",
  fontSize: "15px",
  color: "#e2e2e2"
};

return (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      color: "#fff",
      fontFamily: "Inter, sans-serif"
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        background: "rgba(255,255,255,0.05)",
        padding: "30px",
        borderRadius: "18px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)"
      }}
    >
      <h2 style={{ marginBottom: "20px", fontWeight: "600", color: "#e9e9e9" }}>
        Create a New Trip
      </h2>

      <label htmlFor="name" style={{ fontSize: "14px" }}>Enter name of trip</label>
      <input
        type="text"
        id="name"
        ref={nameRef}
        style={inputStyle}
      />

      <label htmlFor="car" style={{ fontSize: "14px", marginTop: "12px" }}>
        Select your car
      </label>

      <select
        name="car"
        id="car"
        onChange={(e) => {
          const car = myCars.find(c => c._id === e.target.value);
          setSelectedCar(car);
        }}
        style={{
          ...inputStyle,
          cursor: "pointer",
          background: "rgba(255,255,255,0.12)"
        }}
      >
        <option value="">Select</option>
        {myCars.map((cars) => (
          <option key={cars._id} value={cars._id} style={{ color: "#000" }}>
            {cars.name}
          </option>
        ))}
      </select>

      {selectedCar && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.08)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        >
          <p style={infoStyle}>Price per KM: {selectedCar.pricePerKm}</p>
          <p style={infoStyle}>Driver Cost: {selectedCar.driverCost}</p>

          <label htmlFor="distance" style={{ fontSize: "14px" }}>
            Enter total distance of trip (Km)
          </label>

          <input
            type="number"
            id="distance"
            ref={distRef}
            style={inputStyle}
          />

          <button
            onClick={handleCost}
            style={secondaryButton}
          >
            Calculate Cost
          </button>

          <p style={{ marginTop: "10px", fontSize: "16px", fontWeight: "500" }}>
            Total Cost: {cost}
          </p>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ width: 300, margin: "50px auto" }}>
        <DatePicker
         disablePast
          label="Select a date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
        />
      </div>
    </LocalizationProvider>
    <button
        onClick={handleCreateTrip}
        style={primaryButton}
      >
        Create Trip
      </button>
        </div>
      )}

      
    </div>
    
  </div>
);

}

export default AddTrip