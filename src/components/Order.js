import React, { useState, useEffect, createRef } from 'react';
import uuid from 'react-uuid';

import Item from './Item';
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
  }, [cart.length])
 
  useEffect(() => {
      if (inputs.length > 0 && inputIndex > -1 && inputs[inputIndex].current !== null) {
          inputs[inputIndex].current.focus();
      }
  }, [cart, inputs, inputIndex]) 
  
     let sum = 0;
 
  function changeAmount(e,product,index) {
      updateAmount(e.target.value,product);
      setInputIndex(index);
  }
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
     <main className='p-3 m-3'>
         <h2 className="Header">Tavarat ostokorissa</h2>
         <div className='table-responsive-sm'>
         <table className="table">
             <tbody>
                 {cart.map((product, index) => {
                   sum+=parseFloat(product.hinta) * parseInt(product.amount);
                   return(
                       <tr key={uuid()} className='formit'>
                           <td className='bg-light'><img src={product.kuvatiedosto} className='ostoskoripikkukuvat img-fluid'></img></td>
                           <td><h4 className='text-white'>{product.tuotenimi}</h4></td>
                           <td className='text-white'>{product.hinta}€</td>
                           <td>
                               <input type={"number"} min={"1"} max={"1000"} ref={inputs[index]} style={{width: '60px'}} value={product.amount} onChange={e => changeAmount(e,product, index)}></input>
                           </td>

                           <td className='text-white'>{product.amount*product.hinta}€</td>

                           <td><button className='btn' href="/#" onClick={() => removeFromCart(product)}>Poista <i class="bi bi-trash3-fill"></i></button></td>
                       
                       </tr>

                    )
                    })}</tbody></table></div>
                    <div><table>
                    <tr key={uuid()}>
                        <td></td>
                        <td>Yhteishinta {sum.toFixed(2)} €</td>
                        <td></td>
                        <td></td>
                    </tr>
             </table>
             <button className='btn m-2' onClick={empty}>Tyhjennä ostoskori</button>
             </div>
        {cart.length > 0 && // Render order form, if theres something in the cart
          <>
            <h3 className='header'>Asiakastiedot:</h3>
            <form onSubmit={order} className='formit p-3 m-6 row'>
              <div className="col-md-6 col-lg-4 p-1 form-floating">
                <input type="text" name="firstname" id="firstname" className='form-control' placeholder='etunimi' onChange={e => setFirstname(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Etunimi</label>
              </div>
              <div className="col-md-6 col-lg-4 p-1 form-floating">
                <input type="text" name="lastname" id="lastname" className='form-control' placeholder='sukunimi' onChange={e => setLastname(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Sukunimi</label>
              </div>
              <div className="col-lg-4 p-1 form-floating">
                <input type="text" name="email" id="email" className='form-control' placeholder='sähköposti' onChange={e => setEmail(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Sähköposti</label>
              </div>
              <div className="col-lg-4 p-1 form-floating">
                <input type="number" name="number" id="number" className='form-control' placeholder='Puhelinnumero' onChange={e => setNumber(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Puhelinnumero</label>
              </div>
              <div className="col-lg-4 p-1 form-floating">
                <input type="text" name="address" id="address" className='form-control' placeholder='Osoite' onChange={e => setAddress(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Osoite</label>
              </div>
              <div className="col-md-6 col-lg-4 p-1 form-floating">
                <input type="number" name="zip" id="zip" className='form-control' placeholder='Postinumero' onChange={e => setZip(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Postinumero</label>
              </div>
              <div className="col-md-6 col-lg-4 p-1 form-floating">
                <input type="text" name="city" id="city" className='form-control' placeholder='Kaupunki' onChange={e => setCity(e.target.value)} />
                <label htmlFor="nimi" className='form-label'>Kaupunki</label>
              </div>
              <div className='buttons m-2'>
                <button className='btn'>Tilaa</button>
              </div>
            </form>
          </>
         } 
     </main>
    )
  } else {
    return (<h3>Thank you for your order</h3>)
  }
}


