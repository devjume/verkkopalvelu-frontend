import React from 'react'

export default function Footer() {
  return(
    <footer className='footer mt-auto text-white container-fluid row p-3'>
      <div className='col-md-4'>
      <ul className='list-group'>
      <li className='list-group-item text-white'>Yhteystiedot:</li>
      <li className='list-group-item text-white'>Sposti: electRoni@email.com</li>
      <li className='list-group-item text-white'>puh: 123456769</li>
      </ul></div> 
      <div className='col-sm-1 col-lg-1 alert'>
      <h1><i className="bi bi-instagram"></i></h1>
      </div>
      <div className='col-sm-1 col-lg-1 alert'>
      <h1><i className="bi bi-facebook"></i></h1>
      </div>
      <div className='col-md-1 alert'>
      <h1><i className="bi bi-twitter"></i></h1>
      </div>
      <div className='col-md-4'>
        <img src='/Screenshot (58).png' className='img-fluid'></img>
      </div>
    </footer>
  )
}
