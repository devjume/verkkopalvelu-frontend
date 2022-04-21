import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function ViewContact({url}) {
  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contacts, setContacts] = useState([])

  const { id } = useParams();

  useEffect(() => {
    if(id !== undefined){
      fetchOneContact(id);
    }else{
      fetchAllContacts();
    }
  }, [id]);
  
  async function fetchAllContacts() {
    axios.get(`${url}/viewcontacts.php`)
      .then((response) => {
        setContacts(response.data);
        setFetchError(null);
      }).catch(error => {
        setFetchError(error.message);
      }).finally(() => {
        setIsLoaded(true);
      })
  }


  async function fetchOneContact(id){
    const params = new URLSearchParams();
    params.append("id", id);
    axios.get(`${url}/viewcontact.php`, { params: { id: id } })
      .then((response) => {
        setContacts(response.data);
        console.log(response.data)
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }).finally(() => {
        setIsLoaded(true);
      })}

      function HomeButton() {
        let history = useNavigate();
      
        function handleClick() {
          history.push("/id");
        }
          return(
          <button type="button" onClick={handleClick}>
            Go home
          </button>
          )
      }

  return (
    
    <>
    <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">nimi</th>
            <th scope="col">sähköposti</th>
            <th scope="col">Tilausnumero</th>
            <th scope="col">Viesti</th>
            {id == undefined && <th scope="col">Avaa</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
        {contacts?.map((contact) => (
          <tr key={contact.id}>
          <td scope="row">{contact.nimi}</td>
          <td scope="row">{contact.sposti}</td>
          <td scope="row">{contact.tilausnro}</td>
          <td scope="row">{contact.viesti}</td>
          {id === undefined && 
            <td>
              <Link to={`/viewcontact/${contact.id}`} className="btn">
                <i className="bi bi-info-circle-fill"></i>
              </Link>
            </td>}
            {id !== undefined && 
            <td>
              <Link to={`/viewcontact`} className="btn" placeholder="Takaisin">Takaisin</Link>
            </td>}
        </tr>
        ))}
          
        </tbody>
    </table>
    </>
  )
}