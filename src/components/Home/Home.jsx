import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  
  const navigate = useNavigate();
  const handlegotoaddcar= ()=>{
        navigate('/addcar')
    }
    const handlegotoaddtrip= ()=>{
        navigate('/addtrip')
    }
    const handlegotoupcomingtrip= ()=>{
        navigate('/upcomingtrips')
    }
    const handlegototripstats= ()=>{
        navigate('/tripstats')
    }
    const handlegotomycars=()=>{
      navigate('/mycars')
    }

    const handlegotoalltrips=()=>{
      navigate('/alltrips')
    }
return (
  <>
    <div className="home-container">

      <div className="home-card">

        <h1 className="home-title">Trip Manager</h1>

        <button className="home-btn" onClick={handlegotoaddcar}>
          <span>Add Car</span>
          <span className="home-icon">🚗</span>
        </button>

        <button className="home-btn" onClick={handlegotoaddtrip}>
          <span>Add Trip</span>
          <span className="home-icon">🧭</span>
        </button>

        <button className="home-btn" onClick={handlegototripstats}>
          <span>Trip Stats</span>
          <span className="home-icon">📊</span>
        </button>

        <button className="home-btn" onClick={handlegotomycars}>
          <span>My Cars</span>
          <span className="home-icon">🚗</span>
        </button>

        <button className="home-btn" onClick={handlegotoalltrips}>
          <span>All Trips</span>
          <span className="home-icon">📋</span>
        </button>

      </div>
    </div>

    <style>
      {`
        .home-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f5f5; /* same as login page */
          padding: 20px;
        }

        .home-card {
          background: white;
          padding: 32px;
          border-radius: 16px;
          max-width: 420px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
          animation: fadeIn 0.4s ease;
        }

        .home-title {
          text-align: center;
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #333;
        }

        .home-btn {
          width: 100%;
          padding: 14px;
          background: #000000ff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }

        .home-btn:hover {
          background: #686769ff;
        }

        .home-btn:active {
          transform: scale(0.97);
        }

        .home-icon {
          font-size: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .home-card {
            padding: 26px;
          }
          .home-title {
            font-size: 22px;
          }
          .home-btn {
            font-size: 15px;
          }
        }
      `}
    </style>
  </>
);


}

export default Home