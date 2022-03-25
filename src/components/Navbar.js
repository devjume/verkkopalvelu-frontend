import React from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';

const URL = "http://localhost/verkkopalvelu-backend/categories.php"


export default function Navbar() {
  const [items, setItems] = useState([])
  useEffect(() => {
    
    axios.get(URL)
      .then((response) => {
        setItems(response.data)
        console.log(response.data[0])
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 
      
  }, [])
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Web Shop</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {items?.map(item => (
            
            <li className="dropdown-item" key={item.id}>
                <Link to="/" className="nav-link" aria-current="page">{item.nimi}</Link>
              </li>
          ))}

          </ul>
        </ul>
        </div>
      </div>
    </nav>
  )
}




