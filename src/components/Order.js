import React from 'react';
import uuid from 'react-uuid';
import { useState, useEffect } from "react"


import Item from './Item';
import axios from 'axios';

export default function Order ({cart, removeFromCart, url, empty}) {
 let sum = 0;

const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [email, setEmail] = useState("");
const [number, setNumber] = useState("");
const [address, setAddress] = useState("");
const [zip, setZip] = useState("");
const [city, setCity] = useState("");
const [finished, setFinished] = useState(false);

  function order(e){
    e.preventDefault();
    console.log(cart)
    const json = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      email: email,
      number: number,
      address: address,
      zip: zip,
      city: city,
      cart: cart,
    });
    console.log(json)
  axios.post(url + "order/save.php",json,{
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(()=>{
    empty();
    setFinished(true);
  }).catch(error =>{
    alert(error.response === undefined ? error : error.response.data.error)
  });
  }

  
if(finished === false){
 return (
     <div>
         <h3 className="Header">Tavarat ostokorissa</h3>
         <table className="table">
             <tbody>
                 {cart.map(product => {
                   sum+=parseFloat(product.hinta);
                   return(
                       <tr key={uuid()}>
                           <td>{product.tuotenimi}</td>
                           <td>{product.hinta}€</td>
                           <td><a href="#" onClick={() => removeFromCart(product)}>Poista</a></td>
                       </tr>
                    )
                    })}
                    <tr key={uuid()}>
                        <td>Yhteishinta {sum.toFixed(2)} €</td>
                        <td></td>
                    </tr>
             </tbody>
         </table>
        {cart.length > 0 && // Render order form, if theres something in the cart
          <>
            <h3 className='header'>Asiakastiedot:</h3>
            <form onSubmit={order}>
              <div className="col-4  form-floating">
                <input type="text" name="firstname" id="firstname" className='form-control' placeholder='etunimi' onChange={e => setFirstname(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Etunimi</label>
              </div>
              <div className="col-4  form-floating">
                <input type="text" name="lastname" id="lastname" className='form-control' placeholder='sukunimi' onChange={e => setLastname(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Sukunimi</label>
              </div>
              <div className="col-4  form-floating">
                <input type="text" name="email" id="email" className='form-control' placeholder='sähköposti' onChange={e => setEmail(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Sähköposti</label>
              </div>
              <div className="col-4  form-floating">
                <input type="number" name="number" id="number" className='form-control' placeholder='Puhelinnumero' onChange={e => setNumber(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Puhelinnumero</label>
              </div>
              <div className="col-4  form-floating">
                <input type="text" name="address" id="address" className='form-control' placeholder='Osoite' onChange={e => setAddress(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Osoite</label>
              </div>
              <div className="col-4  form-floating">
                <input type="number" name="zip" id="zip" className='form-control' placeholder='Postinumero' onChange={e => setZip(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Postinumero</label>
              </div>
              <div className="col-4  form-floating">
                <input type="text" name="city" id="city" className='form-control' placeholder='Kaupunki' onChange={e => setCity(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Kaupunki</label>
              </div>
              <div className='buttons'>
                <button className='btn primary-btn'>Tilaa</button>
              </div>
            </form>
          </>
         } 
     </div>
    )
  } else {
    return (<h3>Thank you for your order</h3>)
  }
}
 