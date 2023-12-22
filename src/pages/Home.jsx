import React from "react"
import bgImg from "../assets/images/home-hero.png"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="home-container">
      <img src={bgImg} className="about-hero-image" alt="pic" />
      <h1>You got the travel plans, we got the travel vans.</h1>
      <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
      <Link to="/vans">Find your van</Link>
    </div>
  )
};