import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AddCategory({ url }) {

  const [categoryName, setCategoryName] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  function postCategory(e) {
    const timer = setTimeout(() => setShowMessage(false), 1500);

    e.preventDefault();

    const params = new URLSearchParams();
    params.append("categoryName", categoryName);
    axios.post(`${url}/add-category.php`, params)
      .then((response) => {
        console.log(response.data);
        setShowMessage(true);
       // clearTimeout(timer)
        //alert(response.data.success);
        let test1 = document.getElementById("add-category");
        setCategoryName("");

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
      {showMessage && <h5>Kategoria lisätty!</h5> }
      <form id="add-category" className='row g-3' onSubmit={postCategory}>
        <div className="col-4 form-floating">
          <input type="text" name="category-name" id="category-name" className='form-control' placeholder='Kategorian nimi' value={categoryName} onChange={e => setCategoryName(e.target.value)} minLength="0" />
          <label htmlFor="category-name" className='form-label'>Tuoteryhmä</label>
        </div>
        <div className="col-auto d-flex align-items-end">
          <button type="submit" className='btn btn-primary'>Lisää</button>
        </div>
      </form>
    </>
    
  )
}
