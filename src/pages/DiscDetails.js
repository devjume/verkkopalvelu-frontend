import React from 'react';
import { Link } from 'react-router-dom';

export default function DiscDetails(props) {
  
  return (
    <div id='detailsDiv'>
      <h2>{props.tuotenimi}</h2>
      <h3>Hinta: {props.alehinta}€</h3>
      <h4 className='linethrough'>{props.hinta}€</h4>
      <p>Speksit: {props.kuvaus}</p>
      <p>Valmistaja: {props.valmistaja}</p>
      <img src={props.kuva}/>
      <Link to={`/discount`}>
            <p>takaisin aletuotteisiin</p>
        </Link>
    </div>
  );
}