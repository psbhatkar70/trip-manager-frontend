
import './App.css'
import AddCar from './components/AddCar/AddCar'
import AddTrip from './components/AddTrip/AddTrip'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import  { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import TripStats from './components/TripStats/TripStats'
import UpcomingTrips from './components/UpcomingTrips/UpcomingTrips'
import MyCars from './components/MyCars/MyCars'
import AllTrips from './components/AllTrips/AllTrips'
import SingleCar from './components/SingleCar/SingleCar'

function App() {

  return (
  <>


  <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addcar" element={<AddCar />} />
        <Route path="/mycars" element={<MyCars />} />
        <Route path="/addtrip" element={<AddTrip />} />
        <Route path="/alltrips" element={<AllTrips />} />
        <Route path="/tripstats" element={<TripStats />} />
        <Route path="/upcomingtrips" element={<UpcomingTrips />} />
        <Route path="/cars/:_id" element={<SingleCar />} />
       
  </Routes>
  </>
  )
}

export default App
