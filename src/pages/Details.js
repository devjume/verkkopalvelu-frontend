import React from 'react';

export default function Details(props) {
  return (
    <div id='detailsDiv'>
      <h2>{props.tuotenimi}</h2>
      <h3>Hinta: {props.hinta}€</h3>
      <p>Speksit: {props.kuvaus}</p>
      <p>Valmistaja: {props.valmistaja}</p>
      <img src={props.kuva}/>
      <a href="#" onClick={props.close}>Takaisin tuotteisiin</a>
    </div>
  );
}