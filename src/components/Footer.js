import React from 'react'

export default function Footer() {
  return(
    <footer className='footer mt-auto text-white p-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
          <ul className='list-group'>
          <li className='list-group-item text-white fs-4'>Yhteystiedot:</li>
          <li className='list-group-item text-white'>Sähköposti: electRoni@email.com</li>
          <li className='list-group-item text-white'>Puhelinnumero: 123456769</li>
          </ul></div> 
          <div className='col-lg-4 row'>
          <div className='col alert'>
          <h1><i className="bi bi-instagram"></i></h1>
          </div>
          <div className='col alert'>
          <h1><i className="bi bi-facebook"></i></h1>
          </div>
          <div className='col alert'>
          <h1><i className="bi bi-twitter"></i></h1>
          </div>
          <div className='col alert'>
          <h1><i className="bi bi-youtube"></i></h1>
          </div>
          </div>
          <div className='col-md-4'>
            <img src='/Screenshot (58).png' className='img-fluid'></img>
          </div>
        </div>
      </div>
    </footer>
  )
}
