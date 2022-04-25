import React from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cart from './Cart';

export default function Navbar({categories, cart}) {

  const [items, setItems] = useState(categories);

  useEffect(() => {

  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to={`/`}  className="nav-link navbar-brand me-0 pe-0" aria-current="page"><img className='navbarimg' src='/kuvapng.png'></img></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
          <ul className='navbar-nav d-flex w-100'>
            <div className='d-flex justify-content-center'>
            <li className="nav-item dropdown d-flex align-items-center">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Kategoriat
              </a>
              <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                {items?.map(item => (
                  <li className="dropdown-item bg-dark" key={item.id}>
                    <Link to={`/${(item.nimi).toLowerCase()}`} className="nav-link" aria-current="page">{item.nimi}</Link>
                  </li>
                ))}
                <li><hr className="dropdown-divider"/></li>
                  <li className='dropdown-item bg-dark'><Link to="/products" className="nav-link" aria-current="page">Kaikki tuotteet</Link></li>
              </ul>
            </li>
              <li className='nav-item dropdown d-flex align-items-center'>
              <a className='nav-link dropdown-toggle' href='#' id='adminDropdown' role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
              <ul className='dropdown-menu bg-dark' aria-labelledby="adminDropdown">
                <li className="dropdown-item bg-dark"><Link to="/admin" className="nav-link">Tuoteiden Hallinta</Link></li>
                <li className="dropdown-item bg-dark"><Link to="/admin/orders" className="nav-link">Tilaukset</Link></li>
                <li className="dropdown-item bg-dark"><Link to="/admin/viewContact" className="nav-link">Yhteydenotot</Link></li>
              </ul>
            </li>
            </div>
            <div className='d-flex ms-auto me-2'>
              <li className='nav-item'><Link to="/contact" className="nav-link"><i className='bi bi-chat-dots-fill fs-3'></i></Link></li>
              <li className="nav-item">
                <Cart cart={cart} />
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}
