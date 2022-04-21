import React from 'react'
import {Link} from "react-router-dom";

export default function Banner() {
  return (
    <div id='banner'>
      <Link to="/discount" className="nav-link">
        <img alt="discount" id='bannerimg' src="../banneri.png"/>
        </Link>
    </div>
  )
}