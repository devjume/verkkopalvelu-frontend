import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AddProduct({ url }) {

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productSupplier, setProductSupplier] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productCategory, setProductCategory] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  function postProduct(e) {
    const timer = setTimeout(() => setShowMessage(false), 1500);

    e.preventDefault();

    const params = new URLSearchParams();
    params.append("tuotenimi", productName)
    params.append("hinta", productPrice)
    params.append("kuvaus", productDesc)
    params.append("valmistaja", productSupplier)
    params.append("kuvatiedosto", productImg)
    params.append("tuoteryhma", productCategory)
    axios.post(`${url}/addproduct.php`, params)
      .then((response) => {
        console.log(response.data);
        setShowMessage(true);
       // clearTimeout(timer)
        //alert(response.data.success);
        setProductName("")
        setProductPrice(0)
        setProductDesc("")
        setProductSupplier("")
        setProductImg("")
        setProductCategory("");
        //setProducts(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 

    //let timeout01 = setTimeout(function() {
    //  alert("Timeout");
    //  setShowMessage(false);
    //}, 1000)
  }

  useEffect(() => {

  }, [])


  return (
    <>  
      {showMessage && <h5>Tuote lisätty!</h5> }
      <form id="add-product" className=''  onSubmit={postProduct}>
        <div className="col-4  form-floating">
          <input type="text" name="tuotenimi" id="product-name" className='form-control' placeholder='Tuotteen nimi' value={productName} onChange={e => setProductName(e.target.value)}/>
          <label htmlFor="product-name" className='form-label'>Tuotenimi</label>
        </div>
        <div className="col-4  form-floating">
          <input type="number" name="hinta" id="product-price" className='form-control' placeholder='Tuotteen hinta' value={productPrice} onChange={e => setProductPrice(e.target.value)}/>
          <label htmlFor="product-price" className='form-label'>Hinta</label>
        </div>
        <div className="col-4  form-floating">
          <textarea type="text" name="kuvaus" id="product-desc" className='form-control' placeholder='Tuotteen kuvaus' value={productDesc} onChange={e => setProductDesc(e.target.value)}/>
          <label htmlFor="product-desc" className='form-label'>Kuvaus</label>
        </div>
        <div className="col-4  form-floating">
          <input type="text" name="valmistaja" id="product-supplier" className='form-control' placeholder='Valmistaja' value={productSupplier} onChange={e => setProductSupplier(e.target.value)}/> 
          <label htmlFor="product-supplier" className='form-label'>Valmistaja</label>
        </div>
        <div className="col-4  form-floating">
          <input type="text" name="kuvatiedosto" id="product-img" className='form-control' placeholder='Kuvatiedosto' value={productImg} onChange={e => setProductImg(e.target.value)}/>
          <label htmlFor="product-img" className='form-label'>Kuvatiedosto</label>
        </div>
        <div className="col-4  form-floating">
          <input type="text" name="tuoteryhma" id="product-category" className='form-control' placeholder='Tuoteryhmä' value={productCategory} onChange={e => setProductCategory(e.target.value)} minLength="0" />
          <label htmlFor="product-category" className='form-label'>Tuoteryhma</label>
        </div>
        <div className="col-auto d-flex align-items-end">
          <button type="submit" className='btn btn-primary'>Lisää</button>
        </div>
      </form>
    </>
    
  )
}
