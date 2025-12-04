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
    <style>{`
      body {
        background: #ddd8d8ff; /* Premium dark background */
      }

      .home-container {
        max-width: 450px;
        margin: 0 auto;
        padding: 40px 20px;
      }

      .home-btn {
        width: 100%;
        padding: 18px 20px;
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        color: #000000ff;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 22px;
        transition: 0.25s ease-in-out;
      }

      .home-btn:hover {
        background: rgba(255, 255, 255, 0.10);
        border-color: rgba(255, 255, 255, 0.25);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.25);
      }

      .home-icon {
        font-size: 22px;
        color: #d4a857; /* Gold Premium Color */
      }

      @media (max-width: 480px) {
        .home-btn {
          padding: 16px 16px;
          font-size: 16px;
        }
        .home-icon {
          font-size: 20px;
        }
      }
    `}</style>

    <div className="home-container">

      <button className="home-btn" onClick={handlegotoaddcar}>
        <span>Add Car</span>
        <span className="home-icon">🚗</span>
      </button>

      <button className="home-btn" onClick={handlegotoaddtrip}>
        <span>Add Trip</span>
        <span className="home-icon">🧭</span>
      </button>

      <button className="home-btn" onClick={handlegotoupcomingtrip}>
        <span>Upcoming Trips</span>
        <span className="home-icon">📅</span>
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
        <span className="home-icon">📊</span>
      </button>

    </div>
  </>
);

}

export default Home