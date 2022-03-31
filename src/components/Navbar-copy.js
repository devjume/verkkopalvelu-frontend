import React from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cart from './Cart';

export default function Navbar({url, categories, cart}) {
  const [items, setItems] = useState(categories);
  useEffect(() => {


  }, [items])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to={`/`}  className="nav-link navbar-brand" aria-current="page">Etusivu</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Kategoriat
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {items?.map(item => (
                  <li className="dropdown-item" key={item.id}>
                    <Link to={`/${item.nimi}`} className="nav-link" aria-current="page">{item.nimi}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className="navba-nav ml-auto">
            <li className="nav-item">
              <Cart cart={cart} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}




