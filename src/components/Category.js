import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Product from './Product';

import ProductCard from "./ProductCard";

export default function Category({ url, addToCart, categoryId, fetchDiscount }) {

  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shopList, setShopList] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [categoryName, setCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState("")

  async function fetchAllProducts() {
    axios.get(`${url}/products.php`)
      .then((response) => {
        setProducts(response.data);
        setFetchError(null);
      }).catch(error => {
        setFetchError(error.message);
      }).finally(() => {
        setIsLoaded(true);
      })
  }

  async function fetchDiscountProducts() {
    axios.get(`${url}/discount.php`)
      .then((response) => {
        setProducts(response.data);
        setFetchError(null);
      }).catch(error => {
        setFetchError(error.message);
      }).finally(() => {
        setIsLoaded(true);
      })
  }

  async function fetchCategoryProducts() {
    const params = new URLSearchParams();
    params.append("id", categoryId);
    axios.post(`${url}/category.php`, params)
      .then((response) => {
        setProducts(response.data);
        setFetchError(null);
      }).catch(error => {
        setFetchError(error.message);
      }).finally(() => {
        setIsLoaded(true);
      })
  }

  useEffect(() => {
    // Kun categoryId on 0 niin näytä kaikki tuotteet. CategoryId=0 on käytössä vain "kaikki tuotteet" sivulla
    if (categoryId === 0) {
      fetchAllProducts();
    } else if (fetchDiscount === true) {
      fetchDiscountProducts();
    } else {
      fetchCategoryProducts();
    }
  }, [categoryId]);



  function close() {
    setSelectedProduct(null)
  }

  if (selectedProduct != null) {
    return <Product
      tuotenimi={selectedProduct.tuotenimi}
      hinta={selectedProduct.hinta}
      kuvaus={selectedProduct.kuvaus}
      valmistaja={selectedProduct.valmistaja}
      kuva={selectedProduct.kuvatiedosto}
      close={close} />
  }


  return (

    <div>
      <h1>Tuotteet:</h1>
      <div className="row mt-3">
        <div className="col-3">
          <label htmlFor="search" className="form-label">Etsi tuotenimellä</label>
          <input type="text" id="search" className="form-control" placeholder='Etsi tuotenimellä' onChange={event => { setSearchTerm(event.target.value) }}></input>
        </div>
      </div>

      {/* Jos tietoja ei ole vielä ladattu, näytä käyttäjälle viesti */}
      {!isLoaded && <h3>Tietoja ladataan...</h3>}

      {/* Jos virheitä, näytä ne käyttäjälle */}
      {fetchError && <h3>{fetchError}</h3>}

      {/* Kun tieto on ladattu eikä virheitä ole niin näytä haluttu elementti */}
      <div className="row g-2 mt-3">
        
        {isLoaded && !fetchError && (products.filter((products) => {
          if (searchTerm == "") {
            return products
          } else if (products.tuotenimi.toLowerCase().includes(searchTerm.toLowerCase())) {
            return products
          }
        }).map((product) =>
          <div className="col-md-4 col-lg-3 d-flex" >
          <ProductCard product={product} addToCart={addToCart} key={product.tuote_id} />
          </div>
        ))}
        
      </div>
    </div>
  )
}