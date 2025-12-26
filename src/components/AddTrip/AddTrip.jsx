import React, { useEffect, useRef, useState } from 'react'
import api from '../../axios/api';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


function AddTrip() {
  const [date,setDate]=useState();
  const [isoDate, setIsoDate] = useState();
  const [daystoadd,setDaystoadd]=useState(0);
    const [myCars, setMyCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [cost,setCost]=useState(0);
    const nameRef =useRef(null);
    const distRef=useRef(null);
    const navigate=useNavigate();
    const [addingtrip,setAddingtrip]=useState(false);
    const handleCost=()=>{
      setCost(selectedCar.pricePerKm * distRef.current.value + selectedCar.driverCost);
    }
    

    const handleCreateTrip=async ()=>{
      if(addingtrip) return;
      setAddingtrip(true);
     try {
      const car =selectedCar._id;
      const distance = distRef.current.value;
      const TripName = nameRef.current.value;
      const TripDate=date.toISOString();
      const newdate = new Date(date);
      newdate.setDate(newdate.getDate() + daystoadd);

// End date
      const TripDateEnd = newdate.toISOString();
      console.log(TripDate);
      console.log(TripDateEnd);
      const res =await api.post('/trips',{ car , distance , TripName , TripDate , TripDateEnd});
      alert("Trip created Successfully");
      navigate('/home');
      setAddingtrip(false);
     } catch (error) {
      console.log(error);
      alert("Error");
      setAddingtrip(false);
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f8f9fc",
  padding: "20px",
};

const card = {
  width: "420px",
  backgroundColor: "#ffffff",
  padding: "28px",
  borderRadius: "16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
};

const labelStyle = {
  fontSize: "15px",
  fontWeight: "500",
  marginBottom: "6px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #d0d0d0",
  marginBottom: "16px",
  fontSize: "15px",
  outline: "none",
};

const selectStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #d0d0d0",
  marginBottom: "16px",
  fontSize: "15px",
  outline: "none",
  backgroundColor: "#fff",
};

const infoBox = {
  marginTop: "20px",
  padding: "16px",
  backgroundColor: "#fafafa",
  borderRadius: "12px",
  border: "1px solid #e5e5e5",
};

const infoText = {
  fontSize: "15px",
  marginBottom: "6px",
};

const primaryButton = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#111",
  color: "#fff",
  borderRadius: "10px",
  border: "none",
  fontSize: "16px",
  fontWeight: "600",
  marginTop: "20px",
  cursor: "pointer",
};

const secondaryButton = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#e9e9e9",
  color: "#111",
  borderRadius: "10px",
  border: "none",
  fontSize: "15px",
  fontWeight: "500",
  marginTop: "12px",
  cursor: "pointer",
};


return (
  <div style={container}>
    <div style={card}>

      <h2 style={{ marginBottom: "18px", fontWeight: "600", color: "#111" }}>
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

          <label htmlFor="">Select no of days it would take for the trip</label>
          <select value={daystoadd}
            onChange={(event) => setDaystoadd(Number(event.target.value))}
            >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

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