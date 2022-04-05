import { useState, useEffect } from "react"
import Category from "./Category";
import Details from './Details';

export default function Products({url}) {

  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shopList, setShopList] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [categoryName, setCategoryName] = useState ('');

  async function fetchProducts() {
    try {
      const response = await fetch(`${url}/products.php`)
      const data = await response.json();

      if (!response.ok) throw Error(data.error);

      setProducts(data);
      setFetchError(null);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);



  function close(){
    setSelectedProduct(null)
  }

  if(selectedProduct != null){
    return <Details
    tuotenimi = {selectedProduct.tuotenimi}
    hinta = {selectedProduct.hinta}
    kuvaus = {selectedProduct.kuvaus}
    valmistaja = {selectedProduct.valmistaja}
    kuva = {selectedProduct.kuvatiedosto}
    close = {close}/>
  }


  return (

    
    <div>
      <h1>Tuotteet:</h1>
      <ul>
          {/* Jos tietoja ei ole vielä ladattu, näytä käyttäjälle viesti */}
          {!isLoaded && <li>"Tietoja ladataan..."</li>}
          
          {/* Jos virheitä, näytä ne käyttäjälle */}
          {fetchError && <li>{fetchError}</li>}

          {/* Kun tieto on ladattu eikä virheitä ole niin näytä haluttu elementti */}
          {isLoaded && !fetchError && (products.map((product) => <div><img src=""></img><li id="products" onClick={e => setSelectedProduct(product)} key={product.tuote_id}>{product.tuotenimi} </li></div>))}
          
      
        
      </ul>
    </div>



  )
}