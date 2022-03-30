import { useState, useEffect } from "react"
import AddCategory from "../components/admin/AddCategory";

export default function Admin({url, id}) {
  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log(url);
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
    <div className="container mb-3">
      <h4>Lisää Tuoteryhmä</h4>
      <AddCategory url={url}/>
    </div>
  )
}