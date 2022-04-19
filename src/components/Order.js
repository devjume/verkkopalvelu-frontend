import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';



import Item from './Item';



export default function Order ({cart,removeFromCart,updateAmount}) {
 const [inputs,_] = useState([]);
 const [inputIndex, setInputIndex] = useState(-1);

 
 useEffect(() => {
     for (let i = 0;i<cart.length;i++) {
         inputs[i] = React.createRef();
     }
 }, [cart.length])

 useEffect(() => {
     if (inputs.length > 0 && inputIndex > -1 && inputs[inputIndex].current !== null) {
         inputs[inputIndex].current.focus();
     }
 }, [cart]) 
 
    let sum = 0;

 function changeAmount(e,product,index) {
     updateAmount(e.target.value,product);
     setInputIndex(index);
 }
 
 return (
     <div>
         <h3 classname="Header">Tavarat ostokorissa</h3>
         <table className="table">
             <tbody>
                 {cart.map((product, index) => {
                   sum+=parseFloat(product.hinta);
                   return(
                       <tr key={uuid()}>
                           <td>{product.tuotenimi}</td>
                           <td>{product.hinta}€</td>
                           <td>
                               <input ref={inputs[index]} style={{width: '60px'}} value={product.amount} onChange={e => changeAmount(e,product)}></input>
                           </td>
                           <td><a href="#" onClick={() => removeFromCart(product)}>Poista</a></td>
                       </tr>
                    )
                    })}
                    <tr key={uuid()}>
                        <td></td>
                        <td>Yhteishinta {sum.toFixed(2)} €</td>
                        <td></td>
                        <td></td>
                    </tr>
             </tbody>
         </table>
     </div>
 )
}

 