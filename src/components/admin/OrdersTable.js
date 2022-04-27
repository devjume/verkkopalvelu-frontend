import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function OrdersTable({ url }) {


  const [orders, setOrders] = useState([])
  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tila, setTila] = useState([])

  useEffect(() => {
    axios.get(`${url}/orders.php`)
      .then((response) => {
        setOrders(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }).finally(() => {
        setIsLoaded(true);
      })
      axios.get(`${url}/tila.php`)
      .then((response) => {
        setTila(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }).finally(() => {
        setIsLoaded(true);
      })
  }, [])

  function updatedTila(tila, tilausnro){
    console.log(tila)
    const params = new URLSearchParams();
    params.append("tila", tila);
    params.append("tilausnro", tilausnro);
    axios.post(`${url}/updatedtila.php`, params)
  }
  return (
    <>
    <div className='m-3 p-3 adminsivu'>
      <h2>Tilaukset</h2>
      <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Tilausnumero</th>
          <th scope="col">Etunimi</th>
          <th scope="col">Sukunimi</th>
          <th scope="col">Tilauspäivämäärä</th>
          <th scope="col">Tila</th>
          <th scope="col">Tiedot</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, index) => (
          <tr key={order.tilausnro}>
            <td scope="row">{order.tilausnro}</td>
            <td scope="row">{order.etunimi}</td>
            <td scope="row">{order.sukunimi}</td>
            <td scope="row">{(new Date(order.pvm * 1000)).toLocaleString("fi-Fi")}</td>
            <td scope="row"><select id="tila" onChange={e => updatedTila(e.target.value, order.tilausnro)}>
            {tila?.map(tila => (
              <option name="tila" value={tila.id}  className="dropdown-item" key={tila.id}>
                {tila.tila}
              </option>))}
          </select></td>
            <td>
              <Link to={`/admin/orders/${(order.tilausnro)}`} className="btn">
                <i className="bi bi-info-circle-fill"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table></div>
    </div>
    </>
  )
}