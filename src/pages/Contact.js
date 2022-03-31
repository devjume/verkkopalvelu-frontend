import { useState, useEffect } from "react"

export default function Contact({url}) {

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");

  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log(url);
  }, []);

  return (
    <div className="container mb-3">
      <h3>Ota yhteyttä</h3>
      <form id="add-product" className='' onSubmit={console.log("123")}>
        <div className="col-3  form-floating">
          <input type="text" name="nimi" id="contact-name" className='form-control' placeholder='Nimi' value={contactName} onChange={e => setContactName(e.target.value)} />
          <label htmlFor="nimi" className='form-label'>Nimi</label>
        </div>
        <div className="col-3  form-floating mt-2">
          <input type="email" name="sposti" id="contact-email" className='form-control' placeholder='Sähköposti' value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
          <label htmlFor="sposti" className='form-label'>Sähköposti</label>
        </div>
        <div className="col-3  form-floating mt-2">
          <input type="text" name="tilausnumero" id="order-number" className='form-control' placeholder='Tilausnumero' value={orderNumber} onChange={e => setOrderNumber(e.target.value)} />
          <label htmlFor="order-number" className='form-label'>Tilausnumero</label>
        </div>
        <div className="col-6  form-floating mt-2">
          <textarea className="form-control" placeholder="Viesti..." id="message" style={{'height': '100px'}}></textarea>
          <label htmlFor="message" className='form-label'>Viesti</label>
        </div>
        <div className="col-auto d-flex align-items-end mt-2">
          <button type="submit" className='btn btn-primary'>Lähetä</button>
        </div>
      </form>
    </div>
  )
}