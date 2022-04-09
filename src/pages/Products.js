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
  const [searchTerm, setSearchTerm] = useState("")

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
      <input type="text" placeholder='Etsi tuotenimellä' onChange={event =>{setSearchTerm(event.target.value)}}></input>
      <ul>
          {/* Jos tietoja ei ole vielä ladattu, näytä käyttäjälle viesti */}
          {!isLoaded && <li>"Tietoja ladataan..."</li>}
          
          {/* Jos virheitä, näytä ne käyttäjälle */}
          {fetchError && <li>{fetchError}</li>}

          {/* Kun tieto on ladattu eikä virheitä ole niin näytä haluttu elementti */}
<<<<<<< HEAD
          {isLoaded && !fetchError && (products.filter((products) =>{
            if(searchTerm == "" ){
              return products
            } else if (products.tuotenimi.toLowerCase().includes(searchTerm.toLowerCase())){
              return products
            }
          }).map((product) => <div><img src=""></img><li id="products" onClick={e => setSelectedProduct(product)} key={product.tuote_id}>{product.tuotenimi} </li></div>))}
          
      
=======
          {isLoaded && !fetchError}
>>>>>>> e4222c1 (Muutettu tuotteet näkyvyyttä bootstrap card komponentin avulla)
        
      </ul>

      <div className="row g-2">
        {isLoaded && !fetchError && (products.map((product) =>
          <div className="col-md-4 col-lg-3 d-flex">
            <div className="card p-2">
              {/*<img src="https://via.placeholder.com/200x200.png" className="card-img-top h-100" alt="kuva1"></img>  */}
              <img src={product.kuvatiedosto} className="card-img-top img-fluid" alt="kuva1" style={{width: "auto", height: "200px", objectFit: "scale-down"}}></img>
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.tuotenimi}</h6>
                <p className="card-text text-truncate flex-fill">{product.kuvaus}</p>
                <div className="d-flex justify-content-between">
                  <h5>{product.hinta}</h5>
                  <a href="#" className="btn btn-primary"><i className="bi bi-cart-fill"></i></a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

        
    </div>



  )
}