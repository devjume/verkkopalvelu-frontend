import { useState, useEffect } from "react"
import AddCategory from "../components/admin/AddCategory";
import AddProduct from "../components/admin/AddProduct";
import DeleteProduct from "../components/admin/DeleteProduct";
import UpdateProduct from "../components/admin/UpdateProduct";
export default function Admin({url, id}) {
  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    /*
    const params = new URLSearchParams();
    params.append("id", id);
    axios.post(`${url}/category.php`, params)
      .then((response) => {
        setProducts(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) */
  }, []);

  return (
    <div className="m-3 p-3 adminsivu">
      <h2>Tuotteiden hallinta</h2>
      <h4>Lisää Tuoteryhmä</h4>
      <AddCategory url={url}/>
      <h4>Lisää Tuote</h4>
      <AddProduct url={url}/>
      <h4>Poista Tuote</h4>
      <DeleteProduct url={url}/>
      <h4>Päivitä Tuote</h4>
      <UpdateProduct url={url}/>
    </div>
  )
}