import React from 'react';
import uuid from 'react-uuid';



import Item from './Item';



export default function Order ({cart, removeFromCart}) {
 let sum = 0;
 
 return (
     <div>
         <h3 classname="Header">Tavarat ostokorissa</h3>
         <table className="table">
             <tbody>
                 {cart.map(product => {
                   sum+=parseFloat(Item.hinta);
                   return(
                       <tr key={uuid()}>
                           <td>{Item.tuotenimi}</td>
                           <td>{Item.hinta}€</td>
                           <td><a href="#" onClick={() => removeFromCart(product)}>Poista</a></td>
                       </tr>
                    )
                    })}
                    <tr key={uuid()}>
                        <td>{sum.toFixed(2)} €</td>
                        <td></td>
                    </tr>
             </tbody>
         </table>
     </div>
 )
}

 