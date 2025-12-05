
import './App.css'
import AddCar from './components/AddCar/AddCar'
import AddTrip from './components/AddTrip/AddTrip'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import  { BrowserRouter, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom'
import TripStats from './components/TripStats/TripStats'
import UpcomingTrips from './components/UpcomingTrips/UpcomingTrips'
import MyCars from './components/MyCars/MyCars'
import AllTrips from './components/AllTrips/AllTrips'
import SingleCar from './components/SingleCar/SingleCar'
import { PrivateRoute, PublicRoute } from './components/RouteGuards/RouteGuards'

function App() {

  return (
  <>


 <Routes>
        
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/addcar" 
          element={
            <PrivateRoute>
              <AddCar />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/mycars" 
          element={
            <PrivateRoute>
              <MyCars />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/addtrip" 
          element={
            <PrivateRoute>
              <AddTrip />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/alltrips" 
          element={
            <PrivateRoute>
              <AllTrips />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/tripstats" 
          element={
            <PrivateRoute>
              <TripStats />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/upcomingtrips" 
          element={
            <PrivateRoute>
              <UpcomingTrips />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/cars/:_id" 
          element={
            <PrivateRoute>
              <SingleCar />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
  </>
  )
}

export default App
