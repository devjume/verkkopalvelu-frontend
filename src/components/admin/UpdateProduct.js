import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function UpdateProduct({ url }) {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [PrevInfLoop, setPrevInfLoop] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [timer, setTimer] = useState(null);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productSupplier, setProductSupplier] = useState("");
  const [productImg, setProductImg] = useState("");

  
  function muokkaa(e) {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("tuotenimi", productName)
    params.append("hinta", productPrice)
    params.append("alehinta", salePrice)
    params.append("kuvaus", productDesc)
    params.append("valmistaja", productSupplier)
    params.append("kuvatiedosto", productImg)
    params.append("id", selectedProduct)
    
    axios.post(`${url}/updateproduct.php`, params)
      .then((response) => {
        console.log(response.data);
        
        setShowMessage(true);
       // clearTimeout(timer)
        //alert(response.data.success);
        setProductName("")
        setProductPrice(0)
        setSalePrice(0)
        setProductDesc("")
        setProductSupplier("")
        setProductImg("")
        //setProducts(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 

    //let timeout01 = setTimeout(function() {
    //  alert("Timeout");
    //  setShowMessage(false);
    //}, 1000)
  }


  function savePick(e) {
    setTimer(setTimeout(() => setShowMessage(false), 2000));

    e.preventDefault();

    const params = new URLSearchParams();
    params.append("id", selectedProduct)
    axios.post(`${url}/productPOST.php`, params)
     .then((response) => {
        
      console.log(response.data.hinta)
      setProductName(response.data.tuotenimi)
      setProductPrice(response.data.hinta)
      setSalePrice(response.data.alehinta)
      setProductDesc(response.data.kuvaus)
      setProductSupplier(response.data.valmistaja)
      setProductImg(response.data.kuvatiedosto)
        
       
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
     <form id="update-product" className=''  onSubmit={savePick}>
  <div className="col-3">
    <label htmlFor="tuote" className="form-label">Tuote:</label>
    <select id="tuote" onChange={e => setSelectedProduct(e.target.value)}>
    {products?.map(product => (
            <option name="tuoteryhma"  value={product.tuote_id}  className="dropdown-item" key={product.tuote_id}>
              {product.tuotenimi}
            </option>))}
    </select>
    <button type="submit" className='btn btn-primary'>Valitse</button>
  </div>
  </form>

  <form id="add-product" className=''  onSubmit={muokkaa}>
        <div className="col-4  form-floating">
          <input type="text" name="tuotenimi" id="product-name" className='form-control' placeholder='Tuotteen nimi' value={productName} onChange={e => setProductName(e.target.value)}/>
          <label htmlFor="product-name" className='form-label'>Tuotenimi</label>
        </div>
        <div className="col-4  form-floating">
          <input type="number" name="hinta" id="product-price" className='form-control' placeholder='Tuotteen hinta' value={productPrice} onChange={e => setProductPrice(e.target.value)}/>
          <label htmlFor="product-price" className='form-label'>Hinta</label>
        </div>
        <div className="col-4  form-floating">
          <input type="number" name="alehinta" id="sale-price" className='form-control' placeholder='Tuotteen alehinta' value={salePrice} onChange={e => setSalePrice(e.target.value)}/>
          <label htmlFor="sale-price" className='form-label'>Alehinta</label>
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
        <div className="col-auto d-flex align-items-end">
          <button type="submit" className='btn btn-primary'>Update</button>
        </div>
      </form>
    </>

    //mitä 
  )
}