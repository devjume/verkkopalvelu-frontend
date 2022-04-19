import { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useMatch, useHistory, useNavigate } from "react-router-dom";

export default function BreadCrumb({ url }) {

  let location = useLocation();


  useEffect(() => {
    console.log(location.pathname);
    let x = location.pathname;
    let y = x.split("/");
    for (let i = 0; i < y.length; i++) {
      console.log(y[i]);
    }
  },[])

  function generateCrumbs(path) {
    return <li className="breadcrumb-item"><Link to={`/${path}`}>Etusivu</Link></li>
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to={`/`}>Etusivu</Link></li>
        <li className="breadcrumb-item"><a href="#">Library</a></li>
        <li className="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
  );
}