import React from 'react'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

export default function AddCategory({ url }) {

  const [categoryName, setCategoryName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [timer, setTimer] = useState(null);

  function postCategory(e) {
    setTimer(setTimeout(() => setShowMessage(false), 2000));

    e.preventDefault();

    const params = new URLSearchParams();
    params.append("categoryName", categoryName);
    axios.post(`${url}/add-category.php`, params)
      .then((response) => {
        setResponseMessage(response.data.message)
        setShowMessage(true);
        setCategoryName("");
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    }
  }, [showMessage])

  return (
    <>
      <form id="add-category" className='row g-3' onSubmit={postCategory}>
        <div className="col-4 form-floating">
          <input type="text" name="category-name" id="category-name" className='form-control' placeholder='Kategorian nimi' value={categoryName} onChange={e => setCategoryName(e.target.value)} minLength="0" />
          <label htmlFor="category-name" className='form-label'>Tuoteryhmä</label>
        </div>
        <div className="col-auto d-flex align-items-end">
          <button type="submit" className='btn btn-primary'>Lisää</button>
        </div>
      </form>
      <div className='mt-1'>
        {showMessage && <p>{responseMessage}</p>}
      </div>
      
    </>
  )
}