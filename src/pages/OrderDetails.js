import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function OrderDetails({url}) {
  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderDetails, setOrderDetails] = useState([])

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${url}/orders.php`, { params: { id: id } })
      .then((response) => {
        setOrderDetails(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }).finally(() => {
        setIsLoaded(true);
      })
  }, [id]);

  return (
    <>
    <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Etunimi</th>
            <th scope="col">Sukunimi</th>
            <th scope="col">Sähköposti</th>
            <th scope="col">Tilausaika</th>
            <th scope="col">Osoite</th>
            <th scope="col">Puhelinnumero</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">{orderDetails.firstname}</td>
            <td scope="row">{orderDetails.lastname}</td>
            <td scope="row">{orderDetails.email}</td>
            <td scope="row">{(new Date(orderDetails.orderDate*1000)).toLocaleString("fi-Fi")}</td>
            <td scope="row">{`${orderDetails.address}, ${orderDetails.zip} ${orderDetails.city}`}</td>
            <td scope="row">{orderDetails.phone}</td>
          </tr>
        </tbody>
    </table>

    <table className="table table-striped mt-2">
      <thead>
        <tr>
          <th scope="col">Rivi</th>
          <th scope="col">Tuote</th>
          <th scope="col">Kpl Määrä</th>
          <th scope="col">Kpl Hinta</th>
          <th scope="col">Summa</th>
        </tr>
      </thead>
      <tbody>
        {orderDetails.rows?.map((row, index) => (
          <tr key={row.rivinro}>
            <td scope="row">{row.rivinro}</td>
            <td>{row.tuotenimi}</td>
            <td>{row.kpl}</td>
            <td>{row.kpl_hinta}€</td>
            <td>{row.summa}€</td>
          </tr>
        ))}
      </tbody>
      </table>
    </>
  )
}