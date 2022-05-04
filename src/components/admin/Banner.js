import React from 'react'
import {Link} from "react-router-dom";

export default function Banner() {
  return (
    <div id='banner' className='mb-3 mx-sm-1 mb-sm-4'>
      <Link to="/discount" className="">
        <img alt="discount" id='bannerimg' src="../banneri.png" className='img-fluid'/>
        </Link>
    </div>
  )
}