import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function DeleteProduct({ url }) {

  const [products, setProducts] = useState([]);
  const [deleteId, setdeleteId] = useState("");
  const [PrevInfLoop, setPrevInfLoop] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [timer, setTimer] = useState(null);

  function RemoveProduct(e) {
    setTimer(setTimeout(() => setShowMessage(false), 2000));

    e.preventDefault();

    const params = new URLSearchParams();
    params.append("tuotenimi", deleteId)
    axios.post(`${url}/deleteproduct.php`, params)
      .then((response) => {
        setResponseMessage(response.data.message)
        setShowMessage(true);
        const newProducts = products.filter((product) => product.id !== deleteId )
        setProducts(newProducts)
        setdeleteId("")
        setPrevInfLoop(!PrevInfLoop)
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 
  }
  useEffect(() => {
    axios.get(`${url}/products.php`)
      .then((response) => {
        console.log(response.data)
        setProducts(response.data)
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 

  }, [PrevInfLoop])
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    }
  }, [showMessage])

  return (
    <>
     <form id="delete-product" className='row p-4 formit'  onSubmit={RemoveProduct}>
  <div className="col-lg-3">
    <label htmlFor="tuote" className="form-label text-white">Tuote:</label>
    <input autoComplete='off' value={deleteId} onChange={e => setdeleteId(e.target.value)} list="tuote" name="tuote" id="tuote-input" className="form-control" placeholder="Poistettava tuote"/>
    <datalist id="tuote">
    {products?.map(product => (
            <option name="tuoteryhma" value={product.tuotenimi} className="dropdown-item" key={product.tuote_id}>
              {product.nimi}
            </option>))}
    </datalist>
    <button type="submit" className='btn m-2'>Poista</button>
  </div>
  </form>
    </>
  )
}