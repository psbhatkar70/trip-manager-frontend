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
   

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0d0d0f, #1a1a1d)",
  padding: "40px 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  color: "#fff",
  fontFamily: "Inter, sans-serif"
};

const card = {
  width: "100%",
  maxWidth: "520px",
  background: "rgba(255,255,255,0.06)",
  padding: "32px",
  borderRadius: "20px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.08)"
};

const labelStyle = {
  fontSize: "14px",
  marginBottom: "6px",
  display: "block",
  color: "#eaeaea",
  fontWeight: 500
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "18px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.12)",
  color: "#fff",
  outline: "none",
  fontSize: "15px",
  transition: "0.25s",
  boxSizing: "border-box"   
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
};

const primaryButton = {
  marginTop: "22px",
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #7b5df6, #9a78ff)",
  border: "none",
  color: "#fff",
  fontWeight: 600,
  fontSize: "17px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 6px 18px rgba(128,90,255,0.4)"
};

const secondaryButton = {
  marginTop: "10px",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#fff",
  fontWeight: 500,
  cursor: "pointer",
  transition: "0.3s"
};

const infoBox = {
  marginTop: "22px",
  padding: "16px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.08)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  border: "1px solid rgba(255,255,255,0.1)"
};

const infoText = {
  marginBottom: "10px",
  fontSize: "15px",
  color: "#f0f0f0b3"
};

return (
  <div style={container}>
    <div style={card}>
      <h2 style={{ marginBottom: "18px", fontWeight: "600", color: "#f5f5f5" }}>
        Create a New Trip
      </h2>

    
      <label htmlFor="name" style={labelStyle}>Enter Trip Name</label>
      <input type="text" id="name" ref={nameRef} style={inputStyle} />

      <label htmlFor="car" style={labelStyle}>Select Your Car</label>
      <select
        name="car"
        id="car"
        onChange={(e) => {
          const car = myCars.find(c => c._id === e.target.value);
          setSelectedCar(car);
        }}
        style={selectStyle}
      >
        <option value="">Select</option>
        {myCars.map((cars) => (
          <option key={cars._id} value={cars._id} style={{ color: "#000" }}>
            {cars.name}
          </option>
        ))}
      </select>

      {selectedCar && (
        <div style={infoBox}>
          <p style={infoText}>Price per KM: <b>{selectedCar.pricePerKm}</b></p>
          <p style={infoText}>Driver Cost: <b>{selectedCar.driverCost}</b></p>

          <label htmlFor="distance" style={labelStyle}>
            Enter Total Distance (Km)
          </label>
          <input type="number" id="distance" ref={distRef} style={inputStyle} />

          <button onClick={handleCost} style={secondaryButton}>
            Calculate Cost
          </button>

          <p style={{ marginTop: "14px", fontSize: "16px", fontWeight: 500 }}>
            Total Cost: {cost}
          </p>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ marginTop: "20px" }}>
              <DatePicker
                disablePast
                label="Select a date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </div>
          </LocalizationProvider>

          <button onClick={handleCreateTrip} style={primaryButton}>
            Create Trip
          </button>
        </div>
      )}
    </div>
  </div>
);


}

export default AddTrip