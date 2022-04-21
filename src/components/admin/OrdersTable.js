import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function OrdersTable({ url }) {


  const [orders, setOrders] = useState([])
  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get(`${url}/orders.php`)
      .then((response) => {
        setOrders(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }).finally(() => {
        setIsLoaded(true);
      })
  }, [])

  return (
    <>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Etunimi</th>
          <th scope="col">Sukunimi</th>
          <th scope="col">Tilauspäivämäärä</th>
          <th scope="col">Tiedot</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, index) => (
          <tr key={order.tilausnro}>
            <td scope="row">{index+1}</td>
            <td>{order.etunimi}</td>
            <td>{order.sukunimi}</td>
            <td>{(new Date(order.pvm * 1000)).toLocaleString("fi-Fi")}</td>
            <td>
              <Link to={`/admin/orders/${(order.tilausnro)}`} className="btn">
                <i className="bi bi-info-circle-fill"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}