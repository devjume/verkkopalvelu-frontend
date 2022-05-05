import React, { useState, useEffect, createRef } from 'react';
import { Link } from "react-router-dom";
import uuid from 'react-uuid';
import axios from 'axios';


export default function Order ({cart,removeFromCart,updateAmount, url, empty}) {
  let sum1 = 0;
  
  const [inputs,_] = useState([]);
  const [inputIndex, setInputIndex] = useState(-1);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
      for (let i = 0;i<cart.length;i++) {
          inputs[i] = React.createRef();
      }
  }, [cart])
 
  useEffect(() => {
      if (inputs.length > 0 && inputIndex > -1 && inputs[inputIndex].current !== null) {
          inputs[inputIndex].current.focus();
      }
  }, [cart, inputs, inputIndex]) 
  
     let sum = 0;
     let allProductCount = 0;

  function changeAmount(e,product,index) {
      updateAmount(parseInt(e.target.value),product);
      setInputIndex(index);
  }
  function order(e){
    e.preventDefault();
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
  axios.post(url + "/order/save.php",json,{
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
    <>
    <main className='p-0 m-0 p-sm-2 '>
      <h2 className="Header py-3 py-md-4 ps-0 ps-md-3 mb-0 text-center text-sm-start">Ostoskori</h2>
      <div className='d-flex flex-column'>
      {cart.map((product, index) => {
        if(product.alehinta > 0) {
          sum+=product.alehinta * parseInt(product.amount);
        } else {
          sum += parseFloat(product.hinta) * parseInt(product.amount);
        }
        allProductCount+=product.amount;
        return (
          <div className='d-flex flex-column flex-sm-row border border-1 border-dark align-items-center mb-2 formit text-white' style={{"minHeight": "200px"}} key={product.tuote_id}>
            <div className='h-100 w-25 p-2 flex-shrink-0 d-flex justify-content-center align-items-center bg-white mb-auto order-1 cartImageDiv'>
              <img src={product.kuvatiedosto} className='ostoskoripikkukuvat' style={{ "height": "200px", "width": "100%", "objectFit": "scale-down"}}></img>
            </div>
            <Link to={`/product/${product.tuote_id}`} className='mb-1 ms-3 order-0 text-center text-sm-start order-sm-1' style={{"textDecoration": "none", "color": "white"}} ><h4 className='mb-1 ms-3 order-0 text-center text-sm-start order-sm-1'>{product.tuotenimi}</h4></Link>
            <div className='d-flex flex-row my-2 order-2 justify-content-center justify-content-sm-end ms-sm-auto'>
              <p className='me-3 mb-0 fs-5'>{product.alehinta === null || product.alehinta == 0 ? (product.amount * product.hinta) : (product.amount * product.alehinta)}€ {product.alehinta > 0 && <s className="fs-6 fw-normal">{product.hinta}€</s>} </p>
              <input type={"number"} min={"1"} max={"1000"} className="me-3 form-control" ref={inputs[index]} style={{"width" : "70px"}} value={product.amount} onChange={e => changeAmount(e, product, index)}></input>
              <button className='btn me-4' href="/#" onClick={() => removeFromCart(product)}><i className="bi bi-trash3-fill"></i></button>
            </div>
          </div>
      )})}
      </div>
      <div className='m-2 py-2'>
        <div className='d-flex flex-column flex-sm-row justify-content-end align-items-center'>
            <button className='btn m-2 me-sm-auto order-sm-0 order-3' onClick={empty}>Tyhjennä ostoskori</button>
            <p className='fs-6 m-0 p-0 mx-3 order-sm-1'>Määrä: {allProductCount} kpl</p>
            <h4 className='m-0 order-sm-2'>Kokonaishinta: {sum.toFixed(2)} €</h4>
        </div>
      </div>
          
        {cart.length > 0 && // Render order form, if theres something in the cart
          <div className='mt-4 container'>
            <h3 className='header text-center text-sm-start'>Yhteystiedot:</h3>
            <form onSubmit={order} className='formit p-3 m-6 row '>
              <div className="col-md-6 col-lg-6 p-1 form-floating">
                <input type="text" name="firstname" id="firstname" className='form-control' placeholder='etunimi' onChange={e => setFirstname(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Etunimi</label>
              </div>
              <div className="col-md-6 col-lg-6 p-1 form-floating">
                <input type="text" name="lastname" id="lastname" className='form-control' placeholder='sukunimi' onChange={e => setLastname(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Sukunimi</label>
              </div>
              <div className="col-lg-6 p-1 form-floating">
                <input type="text" name="email" id="email" className='form-control' placeholder='sähköposti' onChange={e => setEmail(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Sähköposti</label>
              </div>
              <div className="col-lg-6 p-1 form-floating">
                <input type="number" name="number" id="number" className='form-control' min={0} placeholder='Puhelinnumero' onChange={e => setNumber(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Puhelinnumero</label>
              </div>
              <div className="col-lg-4 p-1 form-floating">
                <input type="text" name="address" id="address" className='form-control' placeholder='Osoite' onChange={e => setAddress(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Osoite</label>
              </div>
              <div className="col-md-6 col-lg-4 p-1 form-floating">
                <input type="number" name="zip" id="zip" className='form-control' min={0} placeholder='Postinumero' onChange={e => setZip(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Postinumero</label>
              </div>
              <div className="col-md-6 col-lg-4 p-1 form-floating">
                <input type="text" name="city" id="city" className='form-control' placeholder='Kaupunki' onChange={e => setCity(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Kaupunki</label>
              </div>
              <div className="col p-1">
                <button className='btn w-100 h-100'>Tilaa</button>
              </div>
              
            </form>
          </div>
         } 
         </main>
        </>
    )
  } else {
    return (<h3>Thank you for your order</h3>)
  }
}


