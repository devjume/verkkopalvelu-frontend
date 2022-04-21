import { useState, useEffect } from "react"
import axios from 'axios';

export default function Contact({url}) {

  const [showMessage, setShowMessage] = useState(false);
  const [responseMessage, setResponesMessage] = useState("");
  const [timer, setTimer] = useState(null);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");

  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function submitForm(e) {
    setTimer(setTimeout(() => setShowMessage(false), 2000));
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("nimi", contactName)
    params.append("sposti", contactEmail)
    params.append("tilaunro", orderNumber)
    params.append("viesti", message)

    axios.post(`${url}/contact.php`, params)
      .then((response) => {

        setResponesMessage(response.data.message);
        setShowMessage(true);

        setContactName("");
        setContactEmail("");
        setOrderNumber("");
        setMessage("")


      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    }

  }, [showMessage]);

  return (
    <main className="p-3 m-3">
      {showMessage && <div className="alert alert-success mt-2" role="alert">
        {responseMessage}
      </div>}

      <h1>Ota yhteyttä</h1>
      <form id="add-product" className='formit row p-3' onSubmit={submitForm}>
        <div className="col-lg-3 p-2 form-floating mt-2">
          <input type="text" name="nimi" id="contact-name" className='form-control' placeholder='Nimi' value={contactName} onChange={e => setContactName(e.target.value)} />
          <label htmlFor="nimi" className='form-label'>Nimi</label>
        </div>
        <div className="col-lg-3 p-2  form-floating mt-2">
          <input type="email" name="sposti" id="contact-email" className='form-control' placeholder='Sähköposti' value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
          <label htmlFor="sposti" className='form-label'>Sähköposti</label>
        </div>
        <div className="col-lg-3 p-2  form-floating mt-2">
          <input type="number" name="tilausnumero" id="order-number" className='form-control' min={0} placeholder='Tilausnumero' value={orderNumber} onChange={e => setOrderNumber(e.target.value)} />
          <label htmlFor="order-number" className='form-label'>Tilausnumero</label>
        </div>
        <div className="col-lg-4 p-2  form-floating mt-2">
          <textarea className="form-control" placeholder="Viesti..." id="message" style={{ 'height': '100px' }} value={message} onChange={e => setMessage(e.target.value)} ></textarea>
          <label htmlFor="message" className='form-label'>Viesti</label>
        </div>
        <div className="col-auto d-flex align-items-end mt-2">
          <button type="submit" className='btn'>Lähetä</button>
        </div>
      </form>
    </main>
  )
}