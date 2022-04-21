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
        <Link to={`/`}  className="nav-link navbar-brand" aria-current="page"><img className='navbarimg' src='/kuvapng.png'></img></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Kategoriat
              </a>
              <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                {items?.map(item => (
                  <li className="dropdown-item bg-dark" key={item.id}>
                    <Link to={`/${(item.nimi).toLowerCase()}`} className="dropdown-item text-white bg-dark" aria-current="page">{item.nimi}</Link>
                  </li>
                ))}
                <li><hr className="dropdown-divider"/></li>
                <li><Link to="/products" className="dropdown-item text-white bg-dark" aria-current="page">Kaikki tuotteet</Link></li>
              </ul>
            </li>
            <li className='nav-item dropdown'>
              <a className='nav-link dropdown-toggle' href='#' id='adminDropdown' role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
              <ul className='dropdown-menu bg-dark' aria-labelledby="adminDropdown">
                <li className="dropdown-item bg-dark"><Link to="/admin" className="nav-link">Tuoteiden Hallinta</Link></li>
                <li className="dropdown-item bg-dark"><Link to="/admin/orders" className="nav-link">Tilaukset</Link></li>
                <li className="dropdown-item bg-dark"><Link to="/admin/viewContact" className="nav-link">Yhteydenotot</Link></li>
              </ul>
            </li>
            <li className='nav-item'><Link to="/contact" className="nav-link"><i className='bi bi-chat-dots-fill'></i></Link></li>
            <li className="nav-item">
              <Cart cart={cart} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
